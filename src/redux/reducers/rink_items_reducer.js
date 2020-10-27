const defaultState = {
  currentItem: null,
  rinks: [],
};
const rinkItemsReducer = (state = defaultState, action) => {
  if (action.type === "SET_MAP_RINKS") {
    // clear uploads and set to a new list (action.payload)
    return {
      ...state,
      rinks: action.payload,
    };
  } else if (action.type === "SET_CURRENT_RINK") {
    return {
      ...state,
      currentItem: action.payload,
    };
  }
  return state;
};

// uploads will be on the redux state at:
// state.mapRinks
export default rinkItemsReducer;
