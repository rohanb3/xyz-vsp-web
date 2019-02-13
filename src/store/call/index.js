import mutations from './mutations';
import getters from './getters';

import { callStatuses } from './constants';

const state = {
  callStatus: callStatuses.IDLE,
  token: null,
  callData: null,
};

export default {
  state,
  mutations,
  getters,
};
