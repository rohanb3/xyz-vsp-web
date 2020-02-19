import {
  subscribe as socketSubscribe,
  unsubscribe as socketUnsubscribe,
  subscribeWaitingCallsChanged,
  subscribeActiveCallsChanged,
  subscribeRealTimeDashboardCallFinished,
  subscribeRealTimeDashboardCallAccepted,
  subscribeRealTimeDashboardOperatorsStatusesChanged,
} from '@/services/vspSocket/realtimeDashboardSocket';
import store from '@/store';
import {
  WAITING_CALLS_CHANGED,
  ACTIVE_CALLS_CHANGED,
  REALTIME_DASHBOARD_CALL_FINISHED,
  REALTIME_DASHBOARD_CALL_ACCEPTED,
  REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED,
} from '@/store/realtimeDashboard/mutationTypes';

init();

export async function subscribe() {
  return socketSubscribe();
}

export function unsubscribe() {
  return socketUnsubscribe();
}

function init() {
  subscribeWaitingCallsChanged(onWaitingCallsChanged);
  subscribeActiveCallsChanged(onActiveCallsChanged);
  subscribeRealTimeDashboardCallFinished(onRealTimeDashboardCallFinished);
  subscribeRealTimeDashboardCallAccepted(onRealTimeDashboardCallAccepted);
  subscribeRealTimeDashboardOperatorsStatusesChanged(onRealTimeDashboardOperatorsStatusesChanged);
}

function onWaitingCallsChanged(data) {
  store.commit(WAITING_CALLS_CHANGED, data);
}

function onActiveCallsChanged(data) {
  store.commit(ACTIVE_CALLS_CHANGED, data);
}

function onRealTimeDashboardCallFinished(data) {
  store.commit(REALTIME_DASHBOARD_CALL_FINISHED, data);
}

function onRealTimeDashboardCallAccepted(data) {
  store.commit(REALTIME_DASHBOARD_CALL_ACCEPTED, data);
}

function onRealTimeDashboardOperatorsStatusesChanged(data) {
  store.commit(REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED, data);
}
