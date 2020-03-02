import {
  SET_PROFILE_DATA,
  CLEAR_PROFILE_DATA,
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_RESET_TOKEN,
  SET_EMAIL,
  SET_PROMISE_REFRESH_TOKEN,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_PROFILE_DATA](state, profile) {
    state.profileData = profile;
  },
  [CLEAR_PROFILE_DATA](state) {
    state.profileData = {};
  },
  [SET_TOKEN](state, token) {
    console.log('SET_TOKEN > state:', state);
    console.log('SET_TOKEN > token:', token);
    state.token = token;
  },
  [REMOVE_TOKEN](state) {
    console.log('REMOVE_TOKEN > state:', state);
    state.token = null;
  },
  [SET_RESET_TOKEN](state, resetToken) {
    state.resetToken = resetToken;
  },
  [SET_EMAIL](state, email) {
    state.email = email;
  },
  [SET_PROMISE_REFRESH_TOKEN](state, payload) {
    state.refreshTokenPromise = payload;
  },
  /* eslint-enable no-param-reassign */
};
