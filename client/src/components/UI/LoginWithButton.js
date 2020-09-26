import React from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as GithubIcon } from '../../assets/svg/github.svg';
import { ReactComponent as FacebookIcon } from '../../assets/svg/facebook.svg';

const LoginWithButtonWrapper = styled.a`
  color: #ffffff;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid white;
  padding: 0.5em;
  width: 12em;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px;
  margin: 1em 0;

  svg {
    height: 1em;
    width: 1em;
    margin: 0 0.5em 0 0;
    transition: transform 150ms ease-in-out;
  }
  ${(props) =>
    props.type === 'github' &&
    css`
      background: #333;
    `};
  ${(props) =>
    props.type === 'facebook' &&
    css`
      background: #3b5998;
    `};
  ${(props) =>
    props.type === 'google' &&
    css`
      background: red;
    `};

  :hover svg {
    transform: scale(1.2);
  }
`;

export const LoginWithGithubButton = ({ type }) => {
  const authState = Math.random().toString(36).slice(2);
  sessionStorage.setItem('authState', authState);
  return (
    <LoginWithButtonWrapper
      type={type}
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}/login&state=${authState}&scope=user:email`}
    >
      <GithubIcon />
      <span>Login with Github</span>
    </LoginWithButtonWrapper>
  );
};

export const LoginWithFacebookButton = ({ type }) => {
  return (
    <LoginWithButtonWrapper type={type}>
      <FacebookIcon />
      <span>Login with Facebook</span>
    </LoginWithButtonWrapper>
  );
};

export const LoginWithGoogleButton = ({ type }) => {
  return (
    <LoginWithButtonWrapper
      type={type}
      // href={'http://localhost:5000/auth/google'}
      onClick={() => window.open('http://localhost:5000/auth/google', '_self')}
    >
      <span>Login with Google</span>
    </LoginWithButtonWrapper>
  );
};
