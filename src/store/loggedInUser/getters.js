export default {
  /* eslint-disable no-shadow */
  loggedInUserName(state) {
    return state.profileData ? state.profileData.userName : '';
  },
  userData(state) {
    return state.profileData;
  },
  userId(state) {
    return state.profileData ? state.profileData.objectId : null;
  },
};
