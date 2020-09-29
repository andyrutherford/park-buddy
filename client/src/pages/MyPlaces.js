import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getUser } from '../actions/user-actions';

import background from '../assets/img/landing-bg2.jpg';

const MyPlacesWrapper = styled.div`
  h1 {
    font-size: clamp(2em, 5vw, 4em);
    text-align: center;
  }

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

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    h1 {
      text-align: left;
    }
  }
`;

const MyPlaces = ({ isAuthenticated, getUser, user }) => {
  const history = useHistory();
  if (!isAuthenticated) history.push('/login');

  useEffect(() => {
    getUser();
  }, []);

  return (
    <MyPlacesWrapper>
      <h1 className='header'>My Places</h1>
      <div className='page-background'></div>
    </MyPlacesWrapper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, { getUser })(MyPlaces);
