const favoriteReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FAVORITES":
      return action.payload;
    default:
      return state;
  }
};

// uploads will be on the redux state at:
// state.mapRinks
export default favoriteReducer;
