import { SET_CALL_STATUS, SET_CALL_TOKEN, SET_CALL_DATA } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_CALL_STATUS](state, status) {
    state.callStatus = status;
  },
  [SET_CALL_TOKEN](state, token) {
    state.token = token;
  },
  [SET_CALL_DATA](state, callData) {
    state.callData = callData;
  },
  /* eslint-enable no-param-reassign */
};
