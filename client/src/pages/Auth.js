import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { githubAuth, googleAuth, getAuth } from '../actions/auth-actions';

import background from '../assets/img/landing-bg2.jpg';

import {
  LoginWithGithubButton,
  LoginWithFacebookButton,
  LoginWithGoogleButton,
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

const Auth = ({ isAuthenticated, githubAuth, googleAuth, getAuth }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <AuthWrapper>
      {!isAuthenticated ? (
        <div>
          <h1>Not authenticated</h1>
        </div>
      ) : (
        <div>
          <h1>Welcome {user.displayName}</h1>
        </div>
      )}
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
      <LoginWithGoogleButton
        className='login-with'
        type='google'
        onClick={() => googleAuth()}
      />

      <div className='page-background'></div>
    </AuthWrapper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  githubAuth,
  googleAuth,
  getAuth,
})(Auth);
