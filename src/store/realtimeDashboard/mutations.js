import { WAITING_CALLS_CHANGED } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [WAITING_CALLS_CHANGED](state, data) {
    state.waitingCalls = data;
  },
  /* eslint-enable no-param-reassign */
};
