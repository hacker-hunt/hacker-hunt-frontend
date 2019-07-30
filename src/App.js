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
      cooldown: null,
      errors: [],
      messages: [],
      name: '',
      gold: 0,
      inventory: [],
      encumbrance: null,
      strength: null,
      speed: null,
      status: [],
      isExploring: false
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
    const response = await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/', config);
    const json = await response.json();
    this.setState({...this.state, ...json });
  };

  handleExplore = () => {
    const { isExploring } = this.state;
    if (!isExploring) {
      this.setState({ isExploring: true, messages: ['Initiating auto-exploration mode.'] });
    } else {
      this.setState({
        isExploring: false,
        messages: ['Auto-exploration mode interrupted.']
      });
    }
  };

  // Navigation methods
  manualMove = async (direction) => {
    const config = {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        direction,
      })
    };
    const response = await fetch('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', config);
    const json = await response.json();
    this.setState({...this.state, ...json });
  };
  //
  // travelToShop = () => {
  //
  // };
  //
  // sellItems = () => {
  //
  // };
  //
  // takeItem = () => {
  //
  // };

  render() {
    const { mapGraph, messages, isExploring, description, room_id, coordinates, title, items, players, gold, strength, speed, encumbrance, inventory } = this.state;
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
        />
        <FooterComponent messages={messages} handleExplore={this.handleExplore} isExploring={isExploring} manualMove={this.manualMove}/>
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
  background: #34314F;
`;
