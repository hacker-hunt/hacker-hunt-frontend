import React from 'react';
import styled from 'styled-components';

const HeaderComponent = () => {
  return (
      <HeaderWrapper>
        <h1>Hacker Hunter</h1>
      </HeaderWrapper>

  );
};

export default HeaderComponent;

const HeaderWrapper = styled.div`
  text-align: center;
`;
