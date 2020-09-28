import React from 'react';
import { useHistory } from 'react-router';
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

const MyPlaces = ({ isAuthenticated }) => {
  const history = useHistory();
  if (!isAuthenticated) history.push('/login');

  return (
    <MyPlacesWrapper>
      <h1 className='header'>My Places</h1>
      <div className='page-background'></div>
    </MyPlacesWrapper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(MyPlaces);
