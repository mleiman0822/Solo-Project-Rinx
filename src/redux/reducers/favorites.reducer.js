const defaultState = {
  currentItem: null,
  favorites: [],
};

const favoriteReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FAVORITES":
      return action.payload;
    default:
      return state;
  }
};

module.exports = favoriteReducer;
// export default favoriteReducer;
