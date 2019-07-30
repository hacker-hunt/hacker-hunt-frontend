import React from 'react';
import styled, { keyframes } from 'styled-components';
import ProgressBar from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { PlayerLoader } from './Loaders';

/*
This component displays most of the information retrieved from the API.
*/

const SidebarComponent = ({
title,
players,
room,
gold,
strength,
speed,
encumbrance,
items
}) => {
  return (
    <StyledSidebar>
      <div className="room">
        <>
          <h2 className="room-id">
            Room
          </h2>
          <div className="room-info info">
            <h3>title: {title}</h3>
            <p></p>
          </div>
          <div className="info">
            <h3>Items:{items}</h3>
            
          </div>
          <div className="info">
            <h3>Players</h3>
          </div>
        </>
      </div>
      <div className="player">
          <>
            <div className="player-id">
              <h2>name:</h2>
              <div className="gold-info">
                <FontAwesomeIcon icon={faDollarSign} /> <span>{gold}</span>
              </div>
            </div>
            <div className="player-stats">
              <ul>
                <li className="inventory">
                  Inventory:
                </li>
                <li>
                  Encumbrance: <span>{encumbrance}</span>
                </li>
                <li>
                  Strength: <span>{strength}</span>
                </li>
                <li>
                  Speed: <span>{speed}</span>
                </li>
              </ul>
            
            </div>
          </>
      </div>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  width: 25%;
  padding:0.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  
`;

export default SidebarComponent;