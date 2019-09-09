import { operatorStatuses } from './constants';

export default {
  isOperatorIdle(state) {
    return state.operatorStatus === operatorStatuses.IDLE;
  },
  isOperatorOnCall(state) {
    return state.operatorStatus === operatorStatuses.ON_CALL;
  },
  isOperatorOnline(state) {
    return state.operatorStatus !== operatorStatuses.OFFLINE;
  },
  isCallInterrupted(state) {
    return state.operatorStatus === operatorStatuses.INTERRUPTED_CALL;
  },
  activeCallData(state) {
    return state.activeCallData;
  },
  isAnyPendingCall(state) {
    return Boolean(state.pendingCallsInfo.size);
  },
  getOldest(state) {
    return state.pendingCallsInfo.oldest;
  },
  screenSharingExtension(state) {
    return state.screenSharingExtension;
  },
  connectedToSocket(state) {
    return state.connectedToSocket;
  },
  customerDisplayName(state) {
    return state.activeCallData && state.activeCallData.customer
      ? state.activeCallData.customer.displayName
      : '';
  },
  companyName(state) {
    return state.activeCallData && state.activeCallData.branch
      ? state.activeCallData.branch.companyName
      : '';
  },
  connectionDropped(state) {
    return state.connectionDropped;
  },
};
