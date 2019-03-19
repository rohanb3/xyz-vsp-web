import mutations from './mutations';
import getters from './getters';

import { operatorStatuses } from './constants';

const state = {
  operatorStatus: operatorStatuses.IDLE,
  token: null,
  activeCallData: null,
  pendingCallsInfo: {
    oldest: null,
    size: 0,
  },
};

export default {
  state,
  mutations,
  getters,
};
