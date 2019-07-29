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
background: #692DB7;
.container {
  display: flex;
  align-items: center;
  color: white;
  width: 90%;
  height: 100%;
  margin: 0 auto;
}
.logo {
  img {
    width: 44px;
    height: 64px;
  }
}
h1 {
  margin-right: auto;
  margin-left: auto;
  font-size: 3.6rem;
  text-transform: uppercase;
  font-weight: 700;
}
nav {
  a,
  a:visited {
    color: #e5e5e5;
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s;
    transform-origin: bottom;
    padding: 0 0.5rem;
    &:not(:last-child) {
      margin-right: 2rem;
    }
    &:hover {
      color: #7dcdbe;
    }
    span {
      margin-left: 1rem;
    }
  }
  .active {
    color: #7dcdbe !important;
  }
}
`;
