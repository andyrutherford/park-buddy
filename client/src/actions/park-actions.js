import { toast } from 'react-toastify';

export const addPark = (data) => async (dispatch) => {
  try {
    fetch('http://localhost:5000/park/add', {
      method: 'POST', // or 'PUT'
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
      });
  } catch (error) {
    console.log(error.message);
  }
};
