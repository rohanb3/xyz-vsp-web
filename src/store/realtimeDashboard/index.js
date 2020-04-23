import mutations from './mutations';
import getters from './getters';
import actions from './actions';

const state = {
  waitingCalls: {
    items: [],
  },
  activeCalls: {
    items: [],
  },
  waitingCallbacks: {
    items: [],
  },
  operatorsOffline: null,
  operatorsOnline: null,
  operatorsOnCall: null,
  operatorsAvailable: null,
  callStatisticsAnswered: {},
  callStatisticsAbandoned: {},
  callStatisticsCallbacksMissed: null,
  callStatisticsCallbacksAnswered: null,
  tenantsList: [],
  tenantId: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
