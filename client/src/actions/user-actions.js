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

// data = { userId: authUser._id, parkId: parkInfo.code }
export const addPark = (data) => async (dispatch) => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/user/park/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) return response.json();
      throw new Error('There was a problem saving this park.');
    })
    .then((responseJSON) => {
      dispatch({ type: 'SAVE_PARK', payload: responseJSON.savedPlaces });
      toast.success(
        `You have ${
          !responseJSON.savedPlaces.includes(data.parkId)
            ? ' unsaved'
            : ' saved'
        } this park.`
      );
    })
    .catch((err) => console.log(err.message));
};

export const getSavedParks = () => async (dispatch, getState) => {
  console.log('getsavedparks');
  const { auth } = getState();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.user.token}`,
    },
  };

  try {
    const { data } = axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/${auth.user.username}/parks`,
      config
    );
  } catch (error) {}
};
