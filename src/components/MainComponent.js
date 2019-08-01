import React from 'react';
import styled from 'styled-components';

import MapComponent from './MapComponent';
import SidebarComponent from './SidebarComponent';

const MainComponent = (props) => {
  const { mapGraph, description, exits, roomId, coordinates, title, items, players, gold, encumbrance, speed, strength, inventory, cooldown } = props;
  return (
    <MainWrapper>
      <SidebarComponent
          description={description}
          exits={exits}
          roomId={roomId}
          coordinates={coordinates}
          title={title}
          items={items}
          players={players}
          gold={gold}
          strength={strength}
          speed={speed}
          encumbrance={encumbrance}
          inventory={inventory}
          cooldown={cooldown}
      />
      <MapComponent mapGraph={mapGraph} />
    </MainWrapper>
  );
};

export default MainComponent;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
