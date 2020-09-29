import { toast } from 'react-toastify';

import { getHeaders } from '../utils/api';

export const getUser = (userID) => async (dispatch) => {
  fetch(`http://localhost:5000/user/${userID}`, getHeaders)
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error('There was a problem getting user data.');
    })
    .then((responseJSON) => {
      dispatch({ type: 'GET_USER_SUCCESS', payload: responseJSON.user });
    })
    .catch((err) => console.log(err.message));
};

// data = { userId: authUser._id, parkId: parkInfo.code }
export const addPark = (data) => async (dispatch) => {
  fetch('http://localhost:5000/user/park/add', {
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
      toast.success('You have saved this park.');
    })
    .catch((err) => console.log(err.message));
};
