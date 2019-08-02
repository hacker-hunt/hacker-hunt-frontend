import React, { Component } from 'react';
import styled from 'styled-components';
import HeaderComponent from './components/HeaderComponent';
import MainComponent from './components/MainComponent';
import FooterComponent from './components/FooterComponent';

import mapGraph from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledInterface: false,
      mapGraph: mapGraph,
      room_id: null,
      title: '',
      description: '',
      coordinates: '(60, 60)',
      elevation: null,
      terrain: '',
      players: [],
      items: [],
      exits: [],
      cooldown: 0,
      errors: [],
      messages: [],
      name: '',
      gold: 0,
      inventory: [],
      encumbrance: null,
      strength: null,
      speed: null,
      status: [],
      isExploring: false,
      examinedName: '',
      examinedDescription: '',
      examinedWeight: 0,
    };
  }

  componentDidMount() {
    this.initialRequest();
  }

  countDownCooldown = async () => {
    if (!this.state.disabledInterface) {
      const cooldownInterval = setInterval(() => {
        if (this.state.cooldown > 0) {
          this.setState(prevState => ({
            cooldown: prevState.cooldown - 1,
            disabledInterface: true,
          }));
        } else {
          clearInterval(cooldownInterval);
          this.setState({ disabledInterface: false, cooldown: 0 });
        }
      }, 1000);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.state.cooldown > 0 && !this.state.disabledInterface) {
      this.countDownCooldown();
    }
  }

  initialRequest = async () => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    const response = await fetch(
      'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
      config,
    );
    const json = await response.json();
    this.setState({ ...this.state, ...json });
    this.countDownCooldown();

    // Grab player status and display on mount
    this.playerStatus();
  };

  // Gets player status when called after cooldown is finished
  playerStatus = () => {
    setTimeout(async () => {
      const statusConfig = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const statusResponse = await fetch(
        'https://lambda-treasure-hunt.herokuapp.com/api/adv/status/',
        statusConfig,
      );
      const statusJson = await statusResponse.json();
      this.setState({ ...this.state, ...statusJson });
    }, this.state.cooldown * 1000);
    this.countDownCooldown();
  };

  // Displays an up to date counter of current cooldown time
  handleCooldownCounter = () => {
    const cooldownCounterStop = () => {
      clearInterval(moveCountdown);
    };
    const cooldownCounter = () => {
      if (this.state.cooldown > 0) {
        this.setState(prevState => ({
          cooldown: (prevState.cooldown -= 1),
          disabledInterface: true,
        }));
      } else {
        cooldownCounterStop();
        this.setState({ disabledInterface: false });
      }
    };
    const moveCountdown = setInterval(cooldownCounter, 1000);
  };

  handleExplore = () => {
    const { isExploring } = this.state;
    if (!isExploring) {
      this.setState({
        isExploring: true,
        messages: ['Initiating auto-exploration mode.'],
      });
    } else {
      this.setState({
        isExploring: false,
        messages: ['Auto-exploration mode interrupted.'],
      });
    }
  };

  // Navigation methods
  manualMove = direction => {
    const next_room_id = mapGraph[this.state.room_id][1][direction];
    if (next_room_id || next_room_id === 0) {
      setTimeout(async () => {
        const config = {
          method: 'POST',
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            direction,
            next_room_id: next_room_id.toString(),
          }),
        };
        const response = await fetch(
          'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/',
          config,
        );
        const json = await response.json();
        this.setState({ ...this.state, ...json });
      }, this.state.cooldown * 1000);
    }
  };

  travelToShop = () => {
    setTimeout(async () => {
      const config = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target_id: 1,
        }),
      };
      await fetch('http://localhost:5000/traverse', config);
      this.initialRequest();
    }, this.state.cooldown * 1000);
  };

  sellItem = () => {
    if (this.state.inventory.length) {
      setTimeout(async () => {
        const config = {
          method: 'POST',
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.inventory[0],
            confirm: 'yes',
          }),
        };
        const response = await fetch(
          'https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/',
          config,
        );
        const json = await response.json();
        this.setState({
          ...this.state,
          ...json,
        });
        this.playerStatus();
      }, this.state.cooldown * 1000);
    }
  };

  examineItem = async name => {
    try {
      const config = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      };
      const response = await fetch(
        'https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/',
        config,
      );
      const jsonResponse = await response.json();
      this.setState(prevState => ({
        examinedName: jsonResponse.name,
        examinedDescription: jsonResponse.description,
        examinedWeight: jsonResponse.weight,
        cooldown: Math.round(prevState.cooldown + jsonResponse.cooldown),
      }));
    } catch (error) {
      throw error;
    }
  };

  takeItem = async name => {
    if (
      this.state.strength -
        this.state.encumbrance -
        this.state.examinedWeight <=
      0
    ) {
      this.setState({
        messages: ['You are too encumbered to pick up this item.'],
      });
      return;
    }
    try {
      const config = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      };
      const response = await fetch(
        'https://lambda-treasure-hunt.herokuapp.com/api/adv/take/',
        config,
      );
      const jsonResponse = await response.json();
      if (
        jsonResponse.messages &&
        jsonResponse.messages.length &&
        jsonResponse.errors &&
        !jsonResponse.errors.length
      ) {
        this.setState(prevState => {
          const pickedUpItem = jsonResponse.messages[0].slice(19);
          const previousItems = [...prevState.items];
          const itemIndex = previousItems.indexOf(pickedUpItem);
          const itemsWithoutPickedUpItem = previousItems
            .slice(0, itemIndex)
            .concat(previousItems.slice(itemIndex + 1, previousItems.length));
          return {
            inventory: [...prevState.inventory, pickedUpItem],
            items: [...itemsWithoutPickedUpItem],
            messages: [...jsonResponse.messages],
            cooldown: Math.round(prevState.cooldown + jsonResponse.cooldown),
          };
        });
      }
      if (jsonResponse.cooldown) {
        this.setState(prevState => ({
          cooldown: Math.round(prevState.cooldown + jsonResponse.cooldown),
        }));
      }
      if (jsonResponse.errors) {
        this.setState(prevState => ({
          messages: [...prevState.messages, ...jsonResponse.errors],
        }));
      }
    } catch (error) {
      throw error;
    }
  };

  dropItem = async name => {
    try {
      const config = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      };
      const response = await fetch(
        'https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/',
        config,
      );
      const jsonResponse = await response.json();
      if (jsonResponse.messages && jsonResponse.messages.length) {
        this.setState(state => {
          const previousItems = [...state.items];
          const droppedItem = jsonResponse.messages[0].slice(17);
          const previousInventory = [...state.inventory];
          const itemInventoryIndex = previousInventory.indexOf(droppedItem);
          const inventoryWithoutDroppedItem = previousInventory
            .slice(0, itemInventoryIndex)
            .concat(
              previousInventory.slice(
                itemInventoryIndex + 1,
                previousInventory.length,
              ),
            );
          return {
            inventory: [...inventoryWithoutDroppedItem],
            items: [...previousItems, droppedItem],
            messages: [...jsonResponse.messages],
          };
        });
      }
      if (jsonResponse.cooldown) {
        this.setState(prevState => ({
          cooldown: Math.round(prevState.cooldown + jsonResponse.cooldown),
        }));
      }
      if (jsonResponse.errors) {
        this.setState(prevState => ({
          messages: [...prevState.messages, ...jsonResponse.errors],
        }));
      }
    } catch (error) {
      throw error;
    }
  };

  render() {
    const {
      mapGraph,
      messages,
      isExploring,
      description,
      exits,
      room_id,
      coordinates,
      title,
      items,
      players,
      gold,
      strength,
      speed,
      encumbrance,
      inventory,
      name,
      cooldown,
      examinedName,
      examinedDescription,
      examinedWeight,
      disabledInterface,
    } = this.state;
    return (
      <AppWrapper>
        <HeaderComponent cooldown={cooldown}/>
        <MainComponent
          disabledInterface={disabledInterface}
          mapGraph={mapGraph}
          description={description}
          exits={exits}
          roomId={room_id}
          coordinates={coordinates}
          title={title}
          items={items}
          players={players}
          gold={gold}
          strength={strength}
          speed={speed}
          encumbrance={encumbrance}
          inventory={inventory}
          cooldown={cooldown}
          examineItem={this.examineItem}
          name={name}
          examinedName={examinedName}
          examinedDescription={examinedDescription}
          examinedWeight={examinedWeight}
          dropItem={this.dropItem}
        />
        <FooterComponent
          disabledInterface={disabledInterface}
          messages={messages}
          handleExplore={this.handleExplore}
          isExploring={isExploring}
          manualMove={this.manualMove}
          takeItem={this.takeItem}
          name={name}
          travelToShop={this.travelToShop}
          sellItem={this.sellItem}
          examinedName={examinedName}
        />
      </AppWrapper>
    );
  }
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  min-height: 100vh;
  background: #34314f;
`;
