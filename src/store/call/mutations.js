import {
  SET_OPERATOR_STATUS,
  SET_CALL_TOKEN,
  SET_CALL_DATA,
  SET_PENDING_CALLS_INFO,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_OPERATOR_STATUS](state, status) {
    state.operatorStatus = status;
  },
  [SET_CALL_TOKEN](state, token) {
    state.token = token;
  },
  [SET_CALL_DATA](state, callData) {
    if (state.activeCallData) {
      state.activeCallData = Object.assign({}, state.activeCallData, callData);
    } else {
      state.activeCallData = callData;
    }
  },
  [SET_PENDING_CALLS_INFO](state, { size, peak }) {
    state.pendingCallsInfo.size = size;
    state.pendingCallsInfo.oldest = peak;
  },
  /* eslint-enable no-param-reassign */
};
