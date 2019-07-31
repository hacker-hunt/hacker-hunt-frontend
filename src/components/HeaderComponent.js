import React from 'react';
import styled from 'styled-components';

const HeaderComponent = () => {
  return (
    <HeaderWrapper>
        <h1>Treasure Hunt</h1>
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
      height: 44px;
      weight:bold;
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
        color: white;
      }
      span {
        margin-left: 1rem;
      }
    }
    .active {
      color: #f2af58 !important;
    }
  }
  text-align: center;
  font-family: 'Luckiest Guy', cursive;
  box-shadow: 0 1px 12px -2px #1f1d30;
  z-index: 2;
  h1 {
    font-size: 3.6rem;
    text-transform: uppercase;
    font-weight: 700;
  }
`;
