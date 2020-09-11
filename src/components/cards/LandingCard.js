import React from 'react';
import styled from 'styled-components';

const LandingCardWrapper = styled.div`
  background: green;
  height: 20em;
  width: 100%;
  margin: auto;
`;

const LandingCard = () => {
  return (
    <LandingCardWrapper>
      <img
        src='https://source.unsplash.com/random/300x500/?desert'
        alt='desert'
      />
    </LandingCardWrapper>
  );
};

export default LandingCard;
