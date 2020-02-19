import mutations from './mutations';
import getters from './getters';
import actions from './actions';

const state = {
  waitingCalls: null,
  activeCalls: null,
  callFinishedData: null,
  callAcceptedData: null,
  operatorsOffline: null,
  operatorsOnline: null,
  operatorsOnCall: null,
  operatorsAvailable: null,
  responseTimeDurations: {
    data: {},
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
