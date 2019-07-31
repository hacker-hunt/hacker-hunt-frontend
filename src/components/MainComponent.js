import React from 'react';
import styled from 'styled-components';

import MapComponent from './MapComponent';
import SidebarComponent from './SidebarComponent';

const MainComponent = (props) => {
  const { mapGraph, description, roomId, coordinates, title, items, players, gold, encumbrance, speed, strength, inventory, cooldown, examineItem, name, examinedName, examinedWeight, examinedDescription } = props;
  return (
    <MainWrapper>
      <SidebarComponent
          description={description}
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
          examineItem={examineItem}
          name={name}
          examinedName={examinedName}
          examinedDescription={examinedDescription}
          examinedWeight={examinedWeight}
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
