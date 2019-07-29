import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ sidebar }) => {
  return (
    <StyledProgressBar sidebar={sidebar}>
     
    </StyledProgressBar>
  );
};

const StyledProgressBar = styled.div`
  margin-top: ${props => (props.sidebar ? '0' : '2rem')};

`;

export default ProgressBar;