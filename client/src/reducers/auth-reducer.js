const initialState = {
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GITHUB_AUTH':
      return { ...state, isAuthenticated: !state.isAuthenticated };
    default:
      return state;
  }
}
