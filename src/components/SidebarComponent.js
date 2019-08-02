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
        <h1>Room {roomId}
          <span> {coordinates}</span>
        </h1>
        <h2>{title}</h2>
        <p>{description}</p>
        <br />
        <div className="exits">
          <p>Exits:{' '}</p>
          {exits.map(exit => (
            <span key={`${roomId}-${Math.random()* title.length}`}>{exit.toUpperCase()}</span>
          ))}
        </div>
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
              items.map(item => <button disabled={disabledInterface} className="items-players" onClick={() => examineItem(item)} key={`${Math.random()* description.length}`}>{item}</button>)
          )}
        </div>
      </div>

      <div className="player-info">
        <h2>Players</h2>
        <div className="players-list">
          {!players.length || disabledInterface ? (
              <p>There are no players in this room or you're on a cooldown.</p>
          ) : (
              players.map(player => <button disabled={disabledInterface} className="items-players" onClick={() => examineItem(player)} key={`${roomId}-${Math.random()* title.length}`}>{player}</button>)
          )}
        </div>

        <div className="fortune">
          <h2>{name.toUpperCase()}</h2>
          <span> $ {gold}</span>
        </div>

        <div className="abilities">
          <div className="ability">
            <p>Encumbrance:</p>
            <span>{encumbrance}</span>
          </div>

          <div className="ability">
            <p>Strength:</p>
            <span>{strength}</span>
          </div>

          <div className="ability">
            <p>Speed:</p>
            <span>{speed}</span>
          </div>


          <div className="inventory">
            <p>Inventory:</p>
            {
            inventory.length || !disabledInterface
            ? inventory.map(inventoryItem => <button disabled={disabledInterface} className="items-players" onClick={() => dropItem(inventoryItem)} key={`${roomId}-${Math.random()* title.length}`}>{inventoryItem}</button>)
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
    padding-top: 0;
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
  .exits {
    display: flex;
    align-items: baseline;
    padding: 10px 0;
    p {
      font-weight: 700;
      font-size: 2rem;
    }
    span {
    padding: 0 5px 0 8px;
    font-size: 1.6rem;
    font-weight: 700;
    
    }
  }
  .items-list {
    display: flex;
    flex-direction: column;
  }
  .players-list {
    display: flex;
    flex-direction: column;
  }
  
  .list-details {
    height: 80px;
    padding: 1rem;
    background: #34314f;
    border-radius: 3px;
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
      color: #692db7;
      font-weight: 700;
    }
  }
  .abilities {
    .ability {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      span {
        font-size: 1.6rem;
        font-weight: bold;
      }
    }
  }
  
  .inventory {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    p {
    font-size: 1.6rem;
    font-weight: 700;
    padding-bottom: 0.5rem;
    }
  }
`;

export default SidebarComponent;
