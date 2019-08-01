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
    };
  }

  componentDidMount() {
    this.initialRequest();
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
    this.handleCooldownCounter();

    // Grab player status and display on mount
    this.playerstatus();
  };

  // Gets player status when called after cooldown is finished
  playerstatus = () => {
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
    this.handleCooldownCounter();
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
        }));
      } else {
        cooldownCounterStop();
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
    setTimeout(async () => {
      const config = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          direction,
        }),
      };
      const response = await fetch(
        'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/',
        config,
      );
      const json = await response.json();
      this.setState({ ...this.state, ...json });

      this.handleCooldownCounter();
    }, this.state.cooldown * 1000);
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
      const response = await fetch('http://localhost:5000/traverse', config);
      console.log(response);
    }, this.state.cooldown * 1000);
    this.playerstatus();
  };

  travelAnywhere = target_id => {
    setTimeout(async () => {
      const config = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target_id,
        }),
      };
      const response = await fetch('http://localhost:5000/traverse', config);
      console.log(response);
    }, this.state.cooldown * 1000);
    this.playerstatus();
  };

  sellInventory = () => {
    setTimeout(
      this.state.inventory.map(inventoryItem => {
        this.sellItem(inventoryItem);
      }),
      this.state.cooldown * 1000,
    );
  };

  sellItem = item => {
    setTimeout(async () => {
      const config = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item,
          confirm: 'yes',
        }),
      };
      const response = await fetch(
        'https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/',
        config,
      );
      console.log(response);
    }, this.state.cooldown * 1000);
  };

  takeItem = async name => {
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
      if (jsonResponse.items) {
        this.setState(prevState => ({
          inventory: [...prevState.inventory, ...jsonResponse.items],
        }));
      }
      if (jsonResponse.cooldown) {
        this.setState(prevState => ({
          cooldown: prevState.cooldown + jsonResponse.cooldown,
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
    } = this.state;
    return (
      <AppWrapper>
        <HeaderComponent />
        <MainComponent
          mapGraph={mapGraph}
          description={description}
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
        />
        <FooterComponent
          messages={messages}
          handleExplore={this.handleExplore}
          isExploring={isExploring}
          manualMove={this.manualMove}
          takeItem={this.takeItem}
          name={name}
          travelToShop={this.travelToShop}
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
