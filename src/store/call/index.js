import mutations from './mutations';
import getters from './getters';

import { callStatuses } from './constants';

const state = {
  callStatus: callStatuses.IDLE,
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
