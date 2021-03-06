import {
  SET_OPERATOR_STATUS,
  SET_CALL_TOKEN,
  SET_CALL_DATA,
  SET_CONNECTION_TO_CALL_SOCKET,
  SET_PENDING_CALLS_INFO,
  SET_EXTENSION_AVAILABILITY,
  SET_CONNECTION_DROPPED,
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
  [SET_CONNECTION_TO_CALL_SOCKET](state, connected) {
    state.connectedToSocket = connected;
  },
  [SET_CONNECTION_DROPPED](state, value = true) {
    state.connectionDropped = value;
  },
  [SET_PENDING_CALLS_INFO](state, { size, peak }) {
    state.pendingCallsInfo.size = size;
    state.pendingCallsInfo.oldest = peak;
  },
  [SET_EXTENSION_AVAILABILITY](state, installed) {
    state.screenSharingExtension = installed;
  },
  /* eslint-enable no-param-reassign */
};
