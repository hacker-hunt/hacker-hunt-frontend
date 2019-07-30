import React from 'react';
import styled from 'styled-components';

import CardinalsComponent from './CardinalsComponent';

const FooterComponent = (props) => {
  const { messages, isExploring } = props;
  return (
      <FooterWrapper>
        <CardinalsComponent />
        <div className="action-icons">
          <i className="fas fa-store-alt" />
          <i className="fas fa-dollar-sign" />
          <i className="fas fa-hand-paper" />
        </div>
        <div className="messages">
          <button onClick={() => console.log('Exploring...')}>{isExploring ? 'EXPLORING...' : 'EXPLORE'}</button>
          <div>
            {!messages.length ? (
              <p>Click EXPLORE to start exploring.</p>
            ) : (
              messages.map(message => (
                  <p>{message}</p>
              ))
            )}
          </div>
        </div>
      </FooterWrapper>
  );
};

export default FooterComponent;

const FooterWrapper = styled.div`
  text-align: center;
  background: #692DB7;
  display: flex;
  align-items: center;
  .action-icons {
    i {
      padding: 2rem;
      font-size: 3rem;
      color: #FFFFFF;
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
      color: #FFFFFF;
      padding-left: 1.5rem;
    }
    button {
      padding: 1rem 2rem;
      border-radius: 4px;
      font-size: 2rem;
      color: #34314F;
      font-weight: 500;
      &:hover {
        cursor: pointer;
        background: #d7d5e5;
        transition: 0.5s ease;
      }
    }
  }
`;
