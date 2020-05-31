export default (state = false, action2) => {
  switch (action2.type) {
    case "TOGGLE_FORM":
      return !state;
    default:
      return state;
  }
};