const initialState = {
  isAuthenticated: false,
  user: {
    savedPlaces: [],
  },
  error: '',
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: action.payload,
        loading: false,
      };
    case 'SAVE_PARK':
      return {
        ...state,
        user: {
          ...state.user,
          savedPlaces: action.payload,
        },
      };
    default:
      return state;
  }
}
