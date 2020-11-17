import { toast } from 'react-toastify';
import axios from 'axios';
// import { getHeaders } from '../utils/api';

export const logout = () => async (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  toast('You have successfully logged out.');
  window.location.href = '/';
};

export const login = ({ username, password }) => async (dispatch) => {
  dispatch({ type: 'LOGIN_AUTH_REQUEST' });

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      {
        username,
        password,
      }
    );
    dispatch({ type: 'LOGIN_AUTH_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    toast.success('You have successfully logged in.');
  } catch (error) {
    dispatch({ type: 'LOGIN_AUTH_FAIL' });
  }
};

export const signup = ({ username, password }) => async (dispatch) => {
  dispatch({ type: 'START_SIGNUP_AUTH' });

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
      {
        username,
        password,
      }
    );
    localStorage.setItem('userInfo', JSON.stringify(data));
    toast.success('You have successfully created an account.');
    dispatch({ type: 'SIGNUP_AUTH_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'SIGNUP_AUTH_FAIL' });
  }
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
