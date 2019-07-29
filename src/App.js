import React from 'react';
import styled from 'styled-components';
import HeaderComponent from './components/HeaderComponent';
import MainComponent from './components/MainComponent';
import SidebarComponent from './components/SidebarComponent';
import FooterComponent from './components/FooterComponent';

import './App.css';

function App() {
  return (
    <AppWrapper>
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background: #34314F;
`;
