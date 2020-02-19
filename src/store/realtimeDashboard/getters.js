export default {
  waitingCallsCnt(state) {
    return state.waitingCallsCnt;
  },
  activeCallsCnt(state) {
    return state.activeCallsCnt;
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
  duration(state) {
    return state.durations.data;
  },
};
