import {
  WAITING_CALLS_CHANGED,
  ACTIVE_CALLS_CHANGED,
  REALTIME_DASHBOARD_CALL_FINISHED,
  REALTIME_DASHBOARD_CALL_ACCEPTED,
  REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED,
  INSERT_CALLS_ANSWERED_DATA,
  INSERT_CALLS_MISSED_DATA,
  SET_TENANT_LIST,
  SET_TENANT_ID,
  REALTIME_DASHBOARD_CLEAR_DATA,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [WAITING_CALLS_CHANGED](state, data) {
    state.waitingCalls = data;
  },
  [ACTIVE_CALLS_CHANGED](state, data) {
    state.activeCalls = data;
    state.operatorsOnCall = data.count;
    state.operatorsAvailable = state.operatorsOnline - state.operatorsOnCall;
  },

  [REALTIME_DASHBOARD_CALL_FINISHED](state, data) {
    const newMissedAt = data.missedAt;
    if (newMissedAt) {
      state.callStatisticsAbandoned.total += 1;
    }
  },
  [REALTIME_DASHBOARD_CALL_ACCEPTED](state, data) {
    const newWaitingDuration = data.waitingDuration;
    if (state.callStatisticsAnswered) {
      state.callStatisticsAnswered.totalWaitingDuration += newWaitingDuration;
      state.callStatisticsAnswered.total += 1;

      state.callStatisticsAnswered.averageWaitingDuration =
        state.callStatisticsAnswered.totalWaitingDuration / state.callStatisticsAnswered.total;

      if (state.callStatisticsAnswered.maxWaitingDuration < newWaitingDuration) {
        state.callStatisticsAnswered.maxWaitingDuration = newWaitingDuration;
      }
    }
  },
  [REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED](state, data) {
    state.operatorsOffline = data && data.inactiveOperators && data.inactiveOperators.count;
    state.operatorsOnline = data && data.activeOperators && data.activeOperators.count;
    state.operatorsAvailable = state.operatorsOnline - state.operatorsOnCall;
  },
  [INSERT_CALLS_ANSWERED_DATA](state, data) {
    state.callStatisticsAnswered = data;
  },
  [INSERT_CALLS_MISSED_DATA](state, data) {
    state.callStatisticsAbandoned = data;
  },
  [SET_TENANT_LIST](state, data) {
    state.tenantsList = data;
  },
  [SET_TENANT_ID](state, data) {
    state.tenantId = data;
  },
  [REALTIME_DASHBOARD_CLEAR_DATA](state) {
    state.waitingCalls = {};
    state.activeCalls = {};
    state.operatorsOffline = null;
    state.operatorsOnline = null;
    state.operatorsOnCall = null;
    state.operatorsAvailable = null;
    state.callStatisticsAnswered = {};
    state.callStatisticsAbandoned = {};
  },
  /* eslint-enable no-param-reassign */
};
