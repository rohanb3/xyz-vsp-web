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
  screenSharingExtension: false,
  permissions: {},
};

export default {
  state,
  mutations,
  getters,
  actions,
};
