import React from 'react';
import styled from 'styled-components';

const SidebarComponent = (props) => {
  const { description, roomId, coordinates, title, items, players, gold, encumbrance, strength, speed, inventory, cooldown } = props;
  return (
      <SidebarWrapper>
        <div className="room-info">
          <p>Cooldown: {cooldown}</p>
          <h1>Room {roomId}<span> {coordinates}</span></h1>
          <h2>{title}</h2>
          <p>{ description }</p>
          <h2>Items</h2>
          {!items.length ? (
              <p>There are no items in this room.</p>
          ) : (
              items.map(item => (
                  <p key={roomId}>{item}</p>
              ))
          )}
        </div>

        <div className="player-info">
          <h2>Players</h2>
          {!players.length ? (
              <p>There are no players in this room.</p>
          ) : (
              players.map(player => (
                  <p key={roomId}>{player}</p>
              ))
          )}
          <div className="fortune">
            <h2>Gold</h2>
            <span> $ {gold}</span>
          </div>

          <div className="powers">
            <p>Encumbrance: {encumbrance}</p>
            <p>Strength: {strength}</p>
            <p>Speed: {speed}</p>
            <p>Inventory: {inventory}</p>
            {!inventory.length ? (
                <p>Your inventory is currently empty</p>
            ) : (
                inventory.map(inventoryItem => (
                    <p key={roomId}>{inventoryItem}</p>
                ))
            )}
          </div>
        </div>

      </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  background: #d7d5e5;
  height: 85vh;
  width: 300px;
  padding: 1.5rem;
  h1 {
    color: #34314F;
    font-family: 'Changa', sans-serif;
    font-size: 2.4rem;
    font-weight: 700;
  }
  p {
    font-size: 1.6rem;
    color: #34314F
  }
  span {
    color: #692DB7;
  }
  
  h2 {
    font-size: 2rem;
    font-weight: 700;
    padding: 1rem 0;
    color: #34314F
  }
  .fortune {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 1.6rem;
      color: #34314F
    }
  }
`;

export default SidebarComponent;
