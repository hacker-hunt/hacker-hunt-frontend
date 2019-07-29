import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/logo.png';
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <HeaderWrapper>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="hacker" />
        </div>
        <h1>Treasure Hunt</h1>
        <nav>
          <NavLink exact to="/">
            <FontAwesomeIcon icon={faMap} />
            <span>Map</span>
          </NavLink>
          <NavLink to="/about">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>About</span>
          </NavLink>
        </nav>
      </div>
    </HeaderWrapper>
  );
};

export default HeaderComponent;

const HeaderWrapper = styled.div`
height: 60px;

`;
