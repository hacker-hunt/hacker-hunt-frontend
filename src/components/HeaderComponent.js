import React from 'react';
import styled from 'styled-components';

const HeaderComponent = () => {
  return (
      <HeaderWrapper>
        <h1>Hacker Hunt</h1>
      </HeaderWrapper>

  );
};

export default HeaderComponent;

const HeaderWrapper = styled.div`
  text-align: center;
  //background: #8158F5;
  background: #692DB7;
  font-family: 'Luckiest Guy', cursive;
  box-shadow: 0 1px 12px -2px #1f1d30;
  z-index: 2;
`;
