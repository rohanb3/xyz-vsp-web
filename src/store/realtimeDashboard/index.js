import mutations from './mutations';
import getters from './getters';
import actions from './actions';

const state = {
  waitingCalls: {},
  activeCalls: {},
  callFinishedData: null,
  callAcceptedData: null,
  operatorsOffline: null,
  operatorsOnline: null,
  operatorsOnCall: null,
  operatorsAvailable: null,
  callStatisticsAnswered: {},
  callStatisticsAbandoned: {},
};

export default {
  state,
  mutations,
  getters,
  actions,
};
