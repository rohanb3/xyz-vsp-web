import {
  WAITING_CALLS_CHANGED,
  ACTIVE_CALLS_CHANGED,
  REALTIME_DASHBOARD_CALL_FINISHED,
  REALTIME_DASHBOARD_CALL_ACCEPTED,
  REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED,
  INSERT_DATA,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [WAITING_CALLS_CHANGED](state, data) {
    state.waitingCallsCnt = data.count;
  },
  [ACTIVE_CALLS_CHANGED](state, data) {
    state.activeCallsCnt = data.count;
    state.operatorsOnCall = data.count;
    state.operatorsAvailable = state.operatorsOnline - state.operatorsOnCall;
  },

  [REALTIME_DASHBOARD_CALL_FINISHED](state, data) {
    state.callFinishedData = data;
  },
  [REALTIME_DASHBOARD_CALL_ACCEPTED](state, data) {
    state.callAcceptedData = data;
  },
  [REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED](state, data) {
    state.operatorsOffline = data && data.inactiveOperators && data.inactiveOperators.count;
    state.operatorsOnline = data && data.activeOperators && data.activeOperators.count;
    state.operatorsAvailable = state.operatorsOnline - state.operatorsOnCall;
  },
  [INSERT_DATA](state, { itemType, data }) {
    console.log('INSERT_DATA > itemType:', itemType);
    console.log('INSERT_DATA > data:', data);
    state[itemType].data = data;
    console.log('INSERT_DATA > state:', state);
  },
  /* eslint-enable no-param-reassign */
};
