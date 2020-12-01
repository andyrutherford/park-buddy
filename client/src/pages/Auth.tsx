import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';

import { login, signup } from '../actions/auth-actions';

import background from '../assets/img/landing-bg2.jpg';

import { LoginForm } from '../components/UI/LoginForm';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { stringify } from 'querystring';

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
  height: 90vh;

  hr {
    width: 280px;
    border: none;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.8);
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

  .btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #fff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2em;
    margin: 0.5em auto;
    padding: 0.5em 1em;
  }
`;

const Auth = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
  const auth = useSelector((state: RootState) => state.auth);
  const { isAuthenticated } = auth;
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    username: 'jerry',
    password: '123456',
    confirmPassword: '',
  });
  const [signupMode, setSignupMode] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signupMode) {
      if (
        formData.username === '' ||
        formData.password === '' ||
        formData.confirmPassword === ''
      ) {
        return toast.error('All form fields are required.');
      }
      if (formData.password !== formData.confirmPassword) {
        return toast.error('The passwords do not match.');
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

  if (isAuthenticated) return <Redirect to='/' />;

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
      <hr />
      <button className='btn' onClick={toggleSignup}>
        {!signupMode ? 'Sign up' : 'Log in'}
      </button>

      <div className='page-background'></div>
    </AuthWrapper>
  );
};

export default Auth;
