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
room
}) => {
  return (
    <StyledSidebar>
      <div className="room">
        <>
          <h2 className="room-id">
            Room 
          </h2>

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