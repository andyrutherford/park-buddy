import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { ReactComponent as GithubIcon } from '../../assets/svg/github.svg';
import { ReactComponent as FacebookIcon } from '../../assets/svg/facebook.svg';
import { ReactComponent as GoogleIcon } from '../../assets/svg/google.svg';

import {
  githubAuth,
  googleAuth,
  facebookAuth,
} from '../../actions/auth-actions';

const LoginWithButtonWrapper = styled.a`
  color: #ffffff;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 0.5px solid white;
  padding: 0.5em;
  width: 12em;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px;
  margin: 1em 0;

  svg {
    height: 1.25em;
    width: 1.25em;
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

const LoginWithGithubButton = ({ type, githubAuth }) => {
  return (
    <LoginWithButtonWrapper type={type} onClick={() => githubAuth()}>
      <GithubIcon />
      <span>Login with Github</span>
    </LoginWithButtonWrapper>
  );
};

const connectedGithubButton = connect(null, { githubAuth })(
  LoginWithGithubButton
);
export { connectedGithubButton as LoginWithGithubButton };

const LoginWithFacebookButton = ({ type, facebookAuth }) => {
  return (
    <LoginWithButtonWrapper type={type} onClick={() => facebookAuth()}>
      <FacebookIcon />
      <span>Login with Facebook</span>
    </LoginWithButtonWrapper>
  );
};

const connectedFacebookButton = connect(null, { facebookAuth })(
  LoginWithFacebookButton
);
export { connectedFacebookButton as LoginWithFacebookButton };

const LoginWithGoogleButton = ({ type, googleAuth }) => {
  return (
    <LoginWithButtonWrapper type={type} onClick={() => googleAuth()}>
      <GoogleIcon />
      <span>Login with Google</span>
    </LoginWithButtonWrapper>
  );
};

const connectedGoogleButton = connect(null, { googleAuth })(
  LoginWithGoogleButton
);
export { connectedGoogleButton as LoginWithGoogleButton };
