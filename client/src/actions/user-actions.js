import axios from 'axios';
import { toast } from 'react-toastify';

import { getHeaders } from '../utils/api';

export const getUser = (userID) => async (dispatch) => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userID}`, getHeaders)
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error('There was a problem getting user data.');
    })
    .then((responseJSON) => {
      dispatch({ type: 'GET_USER_SUCCESS', payload: responseJSON.user });
      return responseJSON.user;
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: 'GET_USER_FAIL' });
    });
};

export const savePark = (parkId) => async (dispatch, getState) => {
  console.log('abc');
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
    console.log(data);
    // dispatch({ type: 'SAVE_PARK_SUCCESS', payload: data.savedPlaces });
  } catch (error) {
    console.log(error);
  }

  // fetch(`${process.env.REACT_APP_BACKEND_URL}/user/park/add`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   credentials: 'include',
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     if (response.status === 201) return response.json();
  //     throw new Error('There was a problem saving this park.');
  //   })
  //   .then((responseJSON) => {
  //     dispatch({ type: 'SAVE_PARK', payload: responseJSON.savedPlaces });
  //     toast.success(
  //       `You have ${
  //         !responseJSON.savedPlaces.includes(data.parkId)
  //           ? ' unsaved'
  //           : ' saved'
  //       } this park.`
  //     );
  //   })
  //   .catch((err) => console.log(err.message));
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
    dispatch({ type: 'GET_SAVED_PARKS_SUCCESS', payload: data.savedPlaces });
  } catch (error) {
    console.log(error);
  }
};
