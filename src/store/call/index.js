import mutations from './mutations';
import getters from './getters';
import actions from './actions';

import { operatorStatuses } from './constants';

const state = {
  operatorStatus: operatorStatuses.IDLE,
  token: null,
  activeCallData: null,
  connectedToSocket: false,
  connectionDropped: false,
  pendingCallsInfo: {
    oldest: null,
    size: 0,
  },
  screenSharingExtension: false,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
