import React from 'react';
import styled from 'styled-components';

import CardinalsComponent from './CardinalsComponent';

const FooterComponent = props => {
  const {
    messages,
    isExploring,
    handleExplore,
    manualMove,
    takeItem,
    name,
    travelToShop,
    sellInventory,
  } = props;
  return (
    <FooterWrapper>
      <CardinalsComponent manualMove={manualMove} />
      <div className="action-icons">
        <i className="fas fa-store-alt" onClick={() => travelToShop()} />
        <i className="fas fa-dollar-sign"  onClick={() => sellInventory()}/>
        <i className="fas fa-hand-paper" onClick={() => takeItem(name)} />
      </div>
      <div className="messages">
        <button onClick={() => handleExplore()}>
          {isExploring ? 'EXPLORING...' : 'EXPLORE'}
        </button>
        <div>
          {!messages.length ? (
            <p>Click EXPLORE to start exploring.</p>
          ) : (
            messages.map(message => <p key={message}>{message}</p>)
          )}
        </div>
      </div>
    </FooterWrapper>
  );
};

export default FooterComponent;

const FooterWrapper = styled.div`
  text-align: center;
  background: #692db7;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  box-shadow: 0 1px 12px 2px #1f1d30;
  .action-icons {
    padding: 1.5rem;
    i {
      padding-right: 1.5rem;
      font-size: 2.4rem;
      color: #ffffff;
      &:hover {
        cursor: pointer;
        color: #d7d5e5;
        transition: 0.5s ease;
      }
    }
  }

  .messages {
    display: flex;
    align-items: center;
    p {
      font-size: 2rem;
      color: #ffffff;
      padding-left: 1.5rem;
    }
    button {
      width: 180px;
      padding: 0 2rem;
      border-radius: 4px;
      font-size: 2rem;
      color: #34314f;
      font-weight: 700;
      font-family: 'Changa', sans-serif;
      &:hover {
        cursor: pointer;
        background: #d7d5e5;
        transition: 0.5s ease;
      }
    }
  }
`;
