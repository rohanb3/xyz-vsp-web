export default {
  waitingCalls(state) {
    return state.waitingCalls;
  },
  activeCalls(state) {
    return state.activeCalls;
  },
  callFinishedData(state) {
    return state.callFinishedData;
  },
  callAcceptedData(state) {
    return state.callAcceptedData;
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
};
