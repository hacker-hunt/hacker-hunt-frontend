import React from 'react';
import styled from 'styled-components';

const SidebarComponent = props => {
  const {
    description,
    exits,
    roomId,
    coordinates,
    title,
    items,
    players,
    gold,
    encumbrance,
    strength,
    speed,
    inventory,
    cooldown,
    name,
    examinedName,
    examinedDescription,
    examinedWeight,
    examineItem,
    dropItem,
    disabledInterface,
  } = props;
  return (
    <SidebarWrapper>
      <div className="room-info">
        <p>Cooldown: {cooldown}</p>
        <h1>
          Room {roomId}
          <span> {coordinates}</span>
        </h1>
        <h2>{title}</h2>
        <p>{description}</p>
        <br />
        <p>
          Exits:{' '}
          {exits.map(exit => (
            <span>{exit}</span>
          ))}
        </p>
        <div className="list-details">
          {!examinedName ? (
              <p>Click an item or a player to examine.</p>
          ): (
              <div className="details">
                <p>Name: {examinedName}</p>
                <p>Description: {examinedDescription}</p>
                <p>Weight: {examinedWeight}</p>
              </div>
          )}
        </div>

        <h2>Items</h2>

        <div className="items-list">
          {!items.length || disabledInterface ? (
              <p>There are no items in this room or you're on a cooldown.</p>
          ) : (
              items.map(item => <button disabled={disabledInterface} className="items-players" onClick={() => examineItem(item)}>{item}</button>)
          )}
        </div>
      </div>

      <div className="player-info">
        <h2>Players</h2>
        <div className="players-list">
          {!players.length || disabledInterface ? (
              <p>There are no players in this room or you're on a cooldown.</p>
          ) : (
              players.map(player => <button disabled={disabledInterface} className="items-players" onClick={() => examineItem(player)}>{player}</button>)
          )}
        </div>

        <div className="fortune">
          <h2>{name}</h2>
          <span> $ {gold}</span>
        </div>

        <div className="abilities">
          <p>Encumbrance: {encumbrance}</p>
          <p>Strength: {strength}</p>
          <p>Speed: {speed}</p>
          <p>Inventory:</p>
          <div className="inventory">
            {
            inventory.length || !disabledInterface
            ? inventory.map(inventoryItem => <button disabled={disabledInterface} className="items-players" onClick={() => dropItem(inventoryItem)}>{inventoryItem}</button>)
            : "Your inventory is empty or you're on a cooldown."
          }
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  background: #d7d5e5;
  height: 85vh;
  min-width: 300px;
  width: 300px;
  padding: 1.5rem;
  padding-bottom: 4rem;
  overflow: scroll;
  h1 {
    color: #34314f;
    font-family: 'Changa', sans-serif;
    font-size: 2.4rem;
    font-weight: 700;
  }
  p {
    font-size: 1.6rem;
    color: #34314f;
  }
  span {
    color: #692db7;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    padding: 1rem 0;
    color: #34314f;
  }
  .items-list {
    display: flex;
    flex-direction: column;
  }
  
  .list-details {
    height: 80px;
    padding: 1rem;
    background: #34314f;
    p {
      color: #FFFFFF;
      font-size: 1.4rem;
      font-weight: 200;
    }
    .details {
      color: white;
      font-size: 1.4rem;
    }
  }
  
  .items-players {
    padding: 0.3rem;
    border-radius: 3px;
    margin: 0.2rem 0;
    font-size: 1.4rem;
    background: #FFFFFF;
    color: #34314f;
    &:hover {
    cursor: pointer;
  }
  }
  .fortune {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 1.6rem;
      color: #34314f;
    }
  }
  .inventory {
    display: flex;
    flex-direction: column;
  }
`;

export default SidebarComponent;
