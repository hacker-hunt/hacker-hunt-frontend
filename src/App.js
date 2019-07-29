import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import MainComponent from './components/MainComponent';
import SidebarComponent from './components/SidebarComponent';
import FooterComponent from './components/FooterComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
