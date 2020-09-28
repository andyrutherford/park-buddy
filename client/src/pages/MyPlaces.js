import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import background from '../assets/img/landing-bg2.jpg';

const MyPlacesWrapper = styled.div`
  .page-background {
    background-image: url(${background});
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -100;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background-size: cover;
  }
`;

const MyPlaces = () => {
  return (
    <MyPlacesWrapper>
      <div className='page-background'></div>
    </MyPlacesWrapper>
  );
};

export default MyPlaces;
