const initialState = {
  id: '',
  name: '',
  image: '',
  social: {},
  loading: true,
  savedParks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case 'SAVE_PARK':
      return {
        ...state,
        savedParks: action.payload,
      };
    case 'GET_USER_FAIL':
      return {
        ...state,
        loading: false,
      };
    case 'GET_SAVED_PARKS_SUCCESS':
      return {
        ...state,
        loading: false,
        savedParks: [...action.payload],
      };
    default:
      return state;
  }
}
