import React from 'react';
import styled from 'styled-components';

import MapComponent from './MapComponent';
import SidebarComponent from './SidebarComponent';

const MainComponent = (props) => {
  const { mapGraph } = props;
  return (
      <MainWrapper>
        <SidebarComponent />
        <MapComponent mapGraph={mapGraph} />
      </MainWrapper>
  );
};

export default MainComponent;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
