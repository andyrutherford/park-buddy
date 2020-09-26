const initialState = {
  isAuthenticated: false,
  user: {},
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: action.payload,
      };
    case 'GITHUB_AUTH':
      return { ...state, isAuthenticated: !state.isAuthenticated };
    default:
      return state;
  }
}
