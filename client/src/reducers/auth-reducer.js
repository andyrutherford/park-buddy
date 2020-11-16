const initialState = {
  isAuthenticated: localStorage.getItem('userInfo') ? true : false,
  user: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {},
  error: '',
  loading: false,
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
    case 'LOGIN_AUTH_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        error: '',
      };
    case 'LOGOUT':
      localStorage.removeItem('userInfo');
      return {
        isAuthenticated: false,
        user: {},
        error: '',
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
