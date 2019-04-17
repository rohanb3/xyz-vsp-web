import {
  SET_PROFILE_DATA,
  CLEAR_PROFILE_DATA,
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_RESET_TOKEN,
  SET_EMAIL,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_PROFILE_DATA](state, data) {
    state.profileData = data;
  },
  [CLEAR_PROFILE_DATA](state) {
    state.profileData = {};
  },
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  [REMOVE_TOKEN](state) {
    state.token = null;
  },
  [SET_RESET_TOKEN](state, resetToken) {
    state.resetToken = resetToken;
  },
  [SET_EMAIL](state, email) {
    state.email = email;
  },
  /* eslint-enable no-param-reassign */
};
