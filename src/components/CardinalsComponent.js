import React from 'react';
import styled from 'styled-components';

const CardinalsComponent = (props) => {
  const { manualMove } = props;
  return (
    <CardinalsWrapper>
      <div className="row">
        <span />
          <button onClick={() => manualMove('n')}>N</button>
        <span />
      </div>

      <div className="row">
        <button onClick={() => manualMove('w')}>W</button>
        <span />
        <button className="cardinal-point" onClick={() => manualMove('e')}>E</button>
      </div>

      <div className="row">
        <span />
        <button onClick={() => manualMove('s')}>S</button>
        <span />
      </div>
    </CardinalsWrapper>
  )
};

export default CardinalsComponent;

const CardinalsWrapper = styled.div`
  width: 110px;
  height: 150px;
  display: flex;
  margin: 2rem;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: 0;
  .row {
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    button {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background: #FFFFFF;
      border: none;
      font-weight: bold;
      font-size: 2rem;
      &:hover {
        cursor: pointer;
        background: #d7d5e5;
        transition: 0.5s ease;
      }
    }
  }
`;
