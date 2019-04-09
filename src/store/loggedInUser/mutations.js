import { SET_PROFILE_DATA, CLEAR_PROFILE_DATA, SET_TOKEN, REMOVE_TOKEN } from './mutationTypes';

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
  /* eslint-enable no-param-reassign */
};
