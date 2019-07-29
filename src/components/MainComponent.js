import React from 'react';
import styled from 'styled-components';

import MapComponent from './MapComponent';
import SidebarComponent from './SidebarComponent';

const MainComponent = () => {
  return (
      <MainWrapper>
        <SidebarComponent />
        <MapComponent />
      </MainWrapper>
  );
};

export default MainComponent;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
