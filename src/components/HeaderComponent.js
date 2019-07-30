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
