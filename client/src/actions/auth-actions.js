import { toast } from 'react-toastify';
import axios from 'axios';
import { getHeaders } from '../utils/api';

export const logout = () => async (dispatch) => {
  window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, '_self');
  dispatch({ type: 'LOGOUT_USER' });
};

export const getAuth = () => async (dispatch) => {
  // fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/success`, getHeaders)
  //   .then((response) => {
  //     if (response.status === 200) return response.json();
  //     throw new Error('failed to authenticate user');
  //   })
  //   .then((responseJson) => {
  //     dispatch({ type: 'AUTH_SUCCESS', payload: responseJson.user });
  //     toast.success('You have successfully logged in.');
  //   })
  //   .catch((error) => {
  //     dispatch({ type: 'AUTH_FAIL', payload: 'User authentication failed' });
  //   });

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/auth/success`,
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch({ type: 'AUTH_SUCCESS', payload: res.data.user });
      toast.success('You have successfully logged in.');
    }
  } catch (error) {
    dispatch({ type: 'AUTH_FAIL', payload: 'User authentication failed' });
  }
};

export const login = ({ username, password }) => async (dispatch) => {
  dispatch({ type: 'START_LOGIN_AUTH' });

  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
    {
      username,
      password,
    }
  );
};

export const signup = ({ username, password }) => async (dispatch) => {
  dispatch({ type: 'START_SIGNUP_AUTH' });

  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
    {
      username,
      password,
    }
  );
};

export const githubAuth = () => (dispatch) => {
  dispatch({ type: 'START_GITHUB_AUTH' });
  window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/github`, '_self');
};

export const googleAuth = () => async (dispatch) => {
  dispatch({ type: 'START_GOOGLE_AUTH' });
  window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, '_self');
};

export const facebookAuth = () => async (dispatch) => {
  dispatch({ type: 'START_FACEBOOK_AUTH' });
  window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/facebook`, '_self');
};
