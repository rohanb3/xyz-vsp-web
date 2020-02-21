export default {
  waitingCalls(state) {
    return state.waitingCalls;
  },
  activeCalls(state) {
    return state.activeCalls;
  },
  operatorsOffline(state) {
    return state.operatorsOffline;
  },
  operatorsOnCall(state) {
    return state.operatorsOnCall;
  },
  operatorsAvailable(state) {
    return state.operatorsAvailable;
  },
  callStatisticsAnswered(state) {
    return state.callStatisticsAnswered;
  },
  callStatisticsAbandoned(state) {
    return state.callStatisticsAbandoned;
  },
  tenantsList(state) {
    return state.tenantsList;
  },
  tenantId(state) {
    return state.tenantId;
  },
};
