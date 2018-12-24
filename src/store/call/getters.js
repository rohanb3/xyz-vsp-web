import { callStatuses } from './constants';

export default {
  isIncomingCall(state) {
    return state.callStatus === callStatuses.INCOMING;
  },
};
