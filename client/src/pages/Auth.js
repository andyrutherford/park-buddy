import React from 'react';
import styled from 'styled-components';

import background from '../assets/img/landing-bg2.jpg';
import { ReactComponent as GithubIcon } from '../assets/svg/github.svg';
import { ReactComponent as FacebookIcon } from '../assets/svg/facebook.svg';

import LoginWithButton from '../components/UI/LoginWithButton';

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
  height: 90vh;

  button {
    margin-bottom: 1em;
  }

  button svg {
    height: 1em;
    width: 1em;
    margin: 0 0.5em 0 0;
  }

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

const Auth = () => {
  return (
    <AuthWrapper>
      <LoginWithButton type='github'>
        <GithubIcon />
        <span>Login with Github</span>
      </LoginWithButton>
      <LoginWithButton type='facebook'>
        <FacebookIcon />
        <span>Login with Facebook</span>
      </LoginWithButton>
      <div>login</div>

      <div className='page-background'></div>
    </AuthWrapper>
  );
};

export default Auth;
