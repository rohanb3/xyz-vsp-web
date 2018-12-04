import { SET_LOGGED_IN_USER } from './mutationTypes';

export default {
  [SET_LOGGED_IN_USER](state /* user */) {
    /* eslint-disable-next-line no-param-reassign */
    state.user = { name: 'Admin' };
  },
};
