import { toast } from 'react-toastify';

import { getHeaders } from '../utils/api';

export const logout = () => async (dispatch) => {
  window.open('http://localhost:5000/auth/logout', '_self');
  dispatch({ type: 'LOGOUT_USER' });
};

export const getAuth = () => async (dispatch) => {
  fetch('http://localhost:5000/auth/success', getHeaders)
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error('failed to authenticate user');
    })
    .then((responseJson) => {
      dispatch({ type: 'AUTH_SUCCESS', payload: responseJson.user });
      toast.success('You have successfully logged in.');
    })
    .catch((error) => {
      dispatch({ type: 'AUTH_FAIL', payload: 'User authentication failed' });
    });
};

export const githubAuth = () => (dispatch) => {
  dispatch({ type: 'START_GITHUB_AUTH' });
  window.open('http://localhost:5000/auth/github', '_self');
};

export const googleAuth = () => async (dispatch) => {
  dispatch({ type: 'START_GOOGLE_AUTH' });
  window.open('http://localhost:5000/auth/google', '_self');
};

export const facebookAuth = () => async (dispatch) => {
  dispatch({ type: 'START_FACEBOOK_AUTH' });
  window.open('http://localhost:5000/auth/facebook', '_self');
};
