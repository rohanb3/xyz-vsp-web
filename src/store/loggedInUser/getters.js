export default {
  /* eslint-disable no-shadow */
  loggedInUserName(state) {
    return state.user ? state.user.userName : '';
  },
  userData(state) {
    return state.user;
  },
  userId(state) {
    return state.user ? state.user.objectId : null;
  },
};
