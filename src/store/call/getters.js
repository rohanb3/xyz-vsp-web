import { operatorStatuses } from './constants';

export default {
  isOperatorIdle(state) {
    return state.operatorStatus === operatorStatuses.IDLE;
  },
  isOperatorOnCall(state) {
    return state.operatorStatus === operatorStatuses.ON_CALL;
  },
  activeCallData(state) {
    return state.activeCallData;
  },
  isAnyPendingCall(state) {
    return Boolean(state.pendingCallsInfo.size);
  },
};