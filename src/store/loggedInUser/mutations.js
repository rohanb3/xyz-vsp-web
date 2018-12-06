import { SET_LOGGED_IN_USER, CLEAR_LOGGED_IN_USER } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_LOGGED_IN_USER](state, user) {
    state.user = user;
  },
  [CLEAR_LOGGED_IN_USER](state) {
    state.user = null;
  },
  /* eslint-enable no-param-reassign */
};
