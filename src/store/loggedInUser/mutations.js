import { SET_LOGGED_IN_USER, CLEAR_LOGGED_IN_USER, SET_USER_DATA } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_LOGGED_IN_USER](state, user) {
    state.user = user;
  },
  [CLEAR_LOGGED_IN_USER](state) {
    state.user = null;
  },
  [SET_USER_DATA](state, data) {
    state.user = {
      ...state.user,
      ...data,
    };
  },
  /* eslint-enable no-param-reassign */
};
