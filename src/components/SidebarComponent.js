import React from 'react';
import styled from 'styled-components';

const SidebarComponent = () => {
  return (
      <SidebarWrapper>
        <h1>Sidebar</h1>
      </SidebarWrapper>
  );
};

export default SidebarComponent;

const SidebarWrapper = styled.div`
  background: #d7d5e5;
  height: 85vh;
  width: 250px;
  h1 {
    color: #34314F;
  }
`;
