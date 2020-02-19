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
    state.waitingCalls = data;
  },
  [ACTIVE_CALLS_CHANGED](state, data) {
    state.activeCalls = data;
    state.operatorsOnCall = data.count;
    state.operatorsAvailable = state.operatorsOnline - state.operatorsOnCall;
  },

  [REALTIME_DASHBOARD_CALL_FINISHED](state, data) {
    state.callFinishedData = data;
    if (
      state.callStatisticsAbandoned &&
      state.callFinishedData &&
      state.callFinishedData.missedAt
    ) {
      state.callStatisticsAbandoned.total += 1;
    }
  },
  [REALTIME_DASHBOARD_CALL_ACCEPTED](state, data) {
    state.callAcceptedData = data;
    if (state.callStatisticsAnswered) {
      state.callStatisticsAnswered.averageWaitingDuration =
        (state.callStatisticsAnswered.totalWaitingDuration +
          state.callAcceptedData.waitingDuration) /
        (state.callStatisticsAnswered.total + 1);
      state.callStatisticsAnswered.total += 1;
      if (
        state.callStatisticsAnswered.maxWaitingDuration < state.callAcceptedData.waitingDuration
      ) {
        state.callStatisticsAnswered.maxWaitingDuration = state.callAcceptedData.waitingDuration;
      }
    }
  },
  [REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED](state, data) {
    state.operatorsOffline = data && data.inactiveOperators && data.inactiveOperators.count;
    state.operatorsOnline = data && data.activeOperators && data.activeOperators.count;
    state.operatorsAvailable = state.operatorsOnline - state.operatorsOnCall;
  },
  [INSERT_DATA](state, { itemType, data }) {
    state[itemType] = data;
  },
  /* eslint-enable no-param-reassign */
};
