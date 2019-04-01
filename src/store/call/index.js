import mutations from './mutations';
import getters from './getters';
import actions from './actions';

import { operatorStatuses } from './constants';

const state = {
  operatorStatus: operatorStatuses.IDLE,
  token: null,
  activeCallData: null,
  pendingCallsInfo: {
    oldest: null,
    size: 0,
  },
  isExtensionInstalled: false,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
