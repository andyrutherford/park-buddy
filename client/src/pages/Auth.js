import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { githubAuth } from '../actions/auth-actions';

import background from '../assets/img/landing-bg2.jpg';
import { ReactComponent as GithubIcon } from '../assets/svg/github.svg';
import { ReactComponent as FacebookIcon } from '../assets/svg/facebook.svg';

import {
  LoginWithGithubButton,
  LoginWithFacebookButton,
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

const Auth = ({ isAuthenticated, githubAuth }) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get('code');
  const authState = params.get('state');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (code) {
      setAuthLoading(true);
      if (!authState === sessionStorage.getItem('authState')) {
        return console.warn('Auth state does not match.');
      }
      githubAuth(code);
    }
  }, [authState, code, githubAuth]);

  return (
    <AuthWrapper>
      <LoginWithGithubButton
        className='login-with'
        type='github'
        onClick={() => githubAuth()}
      />
      <LoginWithFacebookButton
        className='login-with'
        type='facebook'
        onClick={() => githubAuth()}
      />
      <div>login</div>

      <div className='page-background'></div>
    </AuthWrapper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { githubAuth })(Auth);
