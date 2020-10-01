import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import background from '../assets/img/landing-bg2.jpg';

import {
  LoginWithFacebookButton,
  LoginWithGoogleButton,
  LoginWithGithubButton,
} from '../components/UI/LoginWithButton';

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
  height: 90vh;

  .page-background {
    background-image: url(${background});
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;

    z-index: -100;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background-size: cover;
  }
`;

const Auth = ({ isAuthenticated }) => {
  const history = useHistory();

  if (isAuthenticated) history.push('/');

  return (
    <AuthWrapper>
      <LoginWithGithubButton className='login-with' type='github' />
      <LoginWithFacebookButton className='login-with' type='facebook' />
      <LoginWithGoogleButton className='login-with' type='google' />

      <div className='page-background'></div>
    </AuthWrapper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authUser: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Auth);
