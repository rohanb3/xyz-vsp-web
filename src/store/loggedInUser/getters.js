export default {
  /* eslint-disable no-shadow */
  loggedInUserName(state) {
    return state.user ? state.user.name : '';
  },
  userData(state) {
    return state.user ? state.user.data : {};
  },
};
