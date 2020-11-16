import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { login, signup } from '../actions/auth-actions';

import background from '../assets/img/landing-bg2.jpg';

import { LoginForm } from '../components/UI/LoginForm';
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

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } = auth;
  const [formData, setFormData] = useState({
    username: 'jerry',
    password: '123456',
    confirmPassword: '',
  });
  const [signupMode, setSignupMode] = useState(false);

  const onInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (signupMode) {
      if (formData.password !== formData.confirmPassword) {
        return alert('The passwords must match');
      }
      dispatch(
        signup({
          username: formData.username,
          password: formData.password,
        })
      );
    } else {
      dispatch(
        login({ username: formData.username, password: formData.password })
      );
    }
  };

  const toggleSignup = () => {
    setFormData({ username: '', password: '', confirmPassword: '' });
    setSignupMode(!signupMode);
  };

  if (isAuthenticated) history.push('/');

  return (
    <AuthWrapper>
      <LoginForm onSubmit={onSubmit}>
        <h1>{signupMode ? 'Sign up' : 'Log in'}</h1>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={onInputChange}
          placeholder='Username'
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={onInputChange}
          placeholder='Password'
        />
        {signupMode && (
          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={onInputChange}
            placeholder='Confirm Password'
          />
        )}
        <button
          className='btn'
          disabled={!formData.username || !formData.password}
        >
          {signupMode ? 'Create Account' : 'Log In'}
        </button>
      </LoginForm>
      <button onClick={toggleSignup}>Sign up</button>
      <LoginWithGithubButton className='login-with' type='github' />
      <LoginWithFacebookButton className='login-with' type='facebook' />
      <LoginWithGoogleButton className='login-with' type='google' />

      <div className='page-background'></div>
    </AuthWrapper>
  );
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   authUser: state.auth.isAuthenticated,
// });

export default Auth;
