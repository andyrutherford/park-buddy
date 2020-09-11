import React from 'react';
import styled from 'styled-components';

const LandingCardWrapper = styled.div`
  margin: auto;
  position: relative;
  transition: transform 150ms ease-in-out;

  :hover {
    transform: scale(1.02);
  }

  :hover .info {
    opacity: 1;
    transform: translateY(-25%);
  }

  :hover .bookmark {
    opacity: 1;
  }

  .info {
    opacity: 0;
    position: absolute;
    top: -2em;
    left: 0;
    transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
    z-index: -1;
  }
  .bookmark {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity 150ms ease-in-out;
  }
  img {
    max-width: 300px;
    width: 100%;
    -webkit-box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
    box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
  }
`;

const LandingCard = () => {
  return (
    <LandingCardWrapper>
      <div className='info'>
        <p className='name'>Death Valley</p>
        <p className='location'>California</p>
      </div>
      <div className='bookmark'>Save</div>
      <img
        src='https://source.unsplash.com/random/250x550/?desert'
        alt='desert'
      />
    </LandingCardWrapper>
  );
};

export default LandingCard;
