export default {
  waitingCalls(state) {
    return state.waitingCalls;
  },
  activeCalls(state) {
    return state.activeCalls;
  },
  waitingCallsCount(state) {
    return (state.waitingCalls && state.waitingCalls.count) || 0;
  },
  activeCallsCount(state) {
    return (state.activeCalls && state.activeCalls.count) || 0;
  },
  operatorsOffline(state) {
    return state.operatorsOffline;
  },
  operatorsOnCall(state) {
    return state.operatorsOnCall || 0;
  },
  operatorsAvailable(state) {
    return state.operatorsAvailable || 0;
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
