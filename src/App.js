import React, { Component } from 'react';
import styled from 'styled-components';
import HeaderComponent from './components/HeaderComponent';
import MainComponent from './components/MainComponent';
import FooterComponent from './components/FooterComponent';

import mapGraph from './data.json';
import './App.css';

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
    console.log(json);
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
    const { mapGraph, messages, isExploring } = this.state;
    return (
      <AppWrapper>
        <HeaderComponent />
        <MainComponent mapGraph={mapGraph} />
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
