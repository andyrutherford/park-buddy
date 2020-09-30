const initialState = {
  id: '',
  name: '',
  image: '',
  social: {},
  loading: true,
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
    default:
      return state;
  }
}
