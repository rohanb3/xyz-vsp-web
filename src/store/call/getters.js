import { callStatuses } from './constants';

export default {
  isIncomingCall(state) {
    return state.callStatus === callStatuses.INCOMING;
  },
  isOperatorIdle(state) {
    return state.callStatus === callStatuses.IDLE;
  },
  isCallActive(state) {
    return state.callStatus === callStatuses.ACTIVE;
  },
};
