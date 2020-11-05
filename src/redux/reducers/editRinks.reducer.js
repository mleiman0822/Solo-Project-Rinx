const editClick = (state = [], action) => {
  switch (action.type) {
    case "EDIT_CLICKED":
      return action.payload;
    default:
      return state;
  }
};
