const defaultState = {
  currentItem: null,
  items: [],
};
const adminReducer = (state = defaultState, action) => {
  if (action.type === "SET_RINKS") {
    // clear uploads and set to a new list (action.payload)
    return {
      ...state,
      items: action.payload,
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
// state.mapItems
export default adminReducer;
