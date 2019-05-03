import { SET_NETWORK_STATUS } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_NETWORK_STATUS](state, status) {
    state.online = status;
  },
  /* eslint-enable no-param-reassign */
};
