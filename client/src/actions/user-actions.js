import axios from 'axios';
import { toast } from 'react-toastify';

// import { getHeaders } from '../utils/api';

export const getUser = () => async (dispatch, getState) => {
  const { auth } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.user.token}`,
    },
  };

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/${auth.user.username}`,
      config
    );
    dispatch({ type: 'GET_USER_SUCCESS', payload: data.user });
  } catch (error) {
    console.log(error);
  }

  // fetch(
  //   `${process.env.REACT_APP_BACKEND_URL}/user/${auth.user.username}`,
  //   getHeaders
  // )
  //   .then((response) => {
  //     if (response.status === 200) return response.json();
  //     throw new Error('There was a problem getting user data.');
  //   })
  //   .then((responseJSON) => {
  //     dispatch({ type: 'GET_USER_SUCCESS', payload: responseJSON.user });
  //     return responseJSON.user;
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //     dispatch({ type: 'GET_USER_FAIL' });
  //   });
};

export const savePark = (parkId) => async (dispatch, getState) => {
  dispatch({ type: 'SAVE_PARK_REQUEST' });
  const { auth } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.user.token}`,
    },
  };

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/park/add`,
      { parkId },
      config
    );
    dispatch({ type: 'SAVE_PARK_SUCCESS', payload: data.savedParks });
    toast.success(
      `You have ${
        !data.savedParks.includes(parkId) ? ' unsaved' : ' saved'
      } this park.`
    );
  } catch (error) {
    console.log(error);
  }
};

export const getSavedParks = () => async (dispatch, getState) => {
  dispatch({ type: 'GET_SAVED_PARKS_REQUEST' });
  const { auth } = getState();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.user.token}`,
    },
  };

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/${auth.user.username}/parks`,
      config
    );
    dispatch({ type: 'GET_SAVED_PARKS_SUCCESS', payload: data.savedParks });
  } catch (error) {
    console.log(error);
  }
};
