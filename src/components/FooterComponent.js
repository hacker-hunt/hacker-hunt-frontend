import React from 'react';
import styled from 'styled-components';

const FooterComponent = () => {
  return (
      <FooterWrapper>
        <h1>Footer</h1>
      </FooterWrapper>
  );
};

export default FooterComponent;

const FooterWrapper = styled.div`
  text-align: center;
  background: #692DB7;
`;
