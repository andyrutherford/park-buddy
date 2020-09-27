import { toast } from 'react-toastify';

export const logout = () => async (dispatch) => {
  console.log('logout');
  fetch('http://localhost:5000/auth/logout')
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error('failed to log out');
    })
    .then((responseJson) => {
      dispatch({ type: 'LOGOUT_SUCCESS' });
      toast(responseJson.message);
    });
};

export const getAuth = () => async (dispatch) => {
  fetch('http://localhost:5000/auth/success', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  })
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
