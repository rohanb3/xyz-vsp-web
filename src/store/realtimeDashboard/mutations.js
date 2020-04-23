import { BE_CALL_TYPES } from '@/constants';
import { isCallbackPending } from '@/services/callbacks';
import { correctDateFault, getDifference } from '@/services/dateHelper';
import {
  WAITING_CALLS_CHANGED,
  WAITING_CALLBACKS_CHANGED,
  ACTIVE_CALLS_CHANGED,
  REALTIME_DASHBOARD_CALL_FINISHED,
  REALTIME_DASHBOARD_CALL_ACCEPTED,
  REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED,
  INSERT_CALLS_ANSWERED_DATA,
  INSERT_CALLS_MISSED_DATA,
  SET_TENANT_LIST,
  SET_TENANT_ID,
  REALTIME_DASHBOARD_CLEAR_DATA,
  INSERT_CALLBACKS_DATA,
  REALTIME_DASHBOARD_CALLBACK_DECLINED,
  REALTIME_DASHBOARD_CALLBACK_ACCEPTED,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [WAITING_CALLS_CHANGED](state, data) {
    const millisecondsDiff = getDifference(new Date(), data.serverTime);

    state.waitingCalls = data.items.length
      ? {
          ...data,
          items: data.items.map(item => ({
            ...item,
            requestedAt: correctDateFault(item.requestedAt, millisecondsDiff),
          })),
        }
      : data;
  },
  [WAITING_CALLBACKS_CHANGED](state, data) {
    const millisecondsDiff = getDifference(new Date(), data.serverTime);

    state.waitingCallbacks = data.items.length
      ? {
          ...data,
          items: data.items.map(item => ({
            ...item,
            requestedAt: correctDateFault(item.requestedAt, millisecondsDiff),
            callbackRequestedAt:
              item.callbacks &&
              correctDateFault(
                (item.callbacks.find(isCallbackPending) || {}).requestedAt,
                millisecondsDiff
              ),
            callType: BE_CALL_TYPES.VIDEO_CALLBACK,
          })),
        }
      : data;

    state.operatorsOnCall = data.count + state.activeCalls.count;
    state.operatorsAvailable = Math.max(0, state.operatorsOnline - state.operatorsOnCall);
  },
  [ACTIVE_CALLS_CHANGED](state, data) {
    const millisecondsDiff = getDifference(new Date(), data.serverTime);

    const localizedData = data.items.length
      ? {
          ...data,
          items: data.items.map(item => ({
            ...item,
            requestedAt: correctDateFault(item.requestedAt, millisecondsDiff),
            acceptedAt: correctDateFault(item.acceptedAt, millisecondsDiff),
          })),
        }
      : data;

    state.activeCalls = localizedData;
    state.operatorsOnCall = localizedData.count + state.waitingCallbacks.count;
    state.operatorsAvailable = Math.max(0, state.operatorsOnline - state.operatorsOnCall);
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

  [REALTIME_DASHBOARD_CALLBACK_DECLINED](state) {
    state.callStatisticsCallbacksMissed += 1;
  },
  [REALTIME_DASHBOARD_CALLBACK_ACCEPTED](state) {
    state.callStatisticsCallbacksAnswered += 1;
  },

  [REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED](state, data) {
    state.operatorsOffline = data && data.inactiveOperators && data.inactiveOperators.count;
    state.operatorsOnline = data && data.activeOperators && data.activeOperators.count;
    state.operatorsAvailable = Math.max(0, state.operatorsOnline - state.operatorsOnCall);
  },
  [INSERT_CALLS_ANSWERED_DATA](state, data) {
    state.callStatisticsAnswered = data;
  },
  [INSERT_CALLS_MISSED_DATA](state, data) {
    state.callStatisticsAbandoned = data;
  },
  [INSERT_CALLBACKS_DATA](state, data) {
    state.callStatisticsCallbacksMissed = data.missed;
    state.callStatisticsCallbacksAnswered = data.answered;
  },
  [SET_TENANT_LIST](state, data) {
    state.tenantsList = data;
  },
  [SET_TENANT_ID](state, data) {
    state.tenantId = data;
  },
  [REALTIME_DASHBOARD_CLEAR_DATA](state) {
    state.waitingCalls = {
      items: [],
    };
    state.waitingCallbacks = {
      items: [],
    };
    state.activeCalls = {
      items: [],
    };
    state.operatorsOffline = null;
    state.operatorsOnline = null;
    state.operatorsOnCall = null;
    state.operatorsAvailable = null;
    state.callStatisticsAnswered = {};
    state.callStatisticsAbandoned = {};
    state.callStatisticsCallbacksMissed = null;
    state.callStatisticsCallbacksAnswered = null;
  },
  /* eslint-enable no-param-reassign */
};
