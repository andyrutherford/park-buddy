import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingCardWrapper = styled.div`
  margin: auto;
  position: relative;
  transition: transform 150ms ease-in-out;
  height: 500px;
  width: 250px;
  font-size: .75em;

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
    object-fit: cover;
    width: 100%;
    height: 100%;
    -webkit-box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
    box-shadow: -1px 8px 20px 0px rgba(0, 0, 0, 0.5);
  }
`;

const LandingCard = ({
  park
}) => {
  console.log(park);
  return (
    <LandingCardWrapper>
      <div className='info'>
        <p className='name'>{park.name}</p>
        <p className='location'>{park.address}</p>
      </div>
      <div className='bookmark'>Save</div>
      <Link to={`/park/${park.parkCode}`}>
        <img src={park.images[0].url} alt={park.images[0].altText} />
      </Link>
    </LandingCardWrapper>
  );
};

export default LandingCard;
