import mutations from './mutations';
import getters from './getters';
import actions from './actions';

const state = {
  waitingCalls: {},
  activeCalls: {},
  operatorsOffline: null,
  operatorsOnline: null,
  operatorsOnCall: null,
  operatorsAvailable: null,
  callStatisticsAnswered: {},
  callStatisticsAbandoned: {},
  tenantsList: [],
  tenantId: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
