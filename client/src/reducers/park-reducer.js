const initialState = {
  savedParks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SAVE_PARK':
      return {
        ...state,
        savedParks: action.payload,
      };
    default:
      return state;
  }
}
