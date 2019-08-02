import React from 'react';
import styled from 'styled-components';

const HeaderComponent = (props) => {
  const { cooldown } = props;
  return (
    <HeaderWrapper>
        <h1>Treasure Hunt</h1>
        <p>Cooldown:
          <span>{cooldown}</span>
        </p>

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
  p {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  color: #FFFFFF;
  }
  span {
  padding-left: 5px;
  color: #FFC15E;
  }
`;
