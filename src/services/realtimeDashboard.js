import {
  subscribe as socketSubscribe,
  unsubscribe as socketUnsubscribe,
  getSubscriptionStatus,
  getSubscriptionTenant,
  subscribeWaitingCallsChanged,
  subscribeWaitingCallbacksChanged,
  subscribeActiveCallsChanged,
  subscribeRealTimeDashboardCallFinished,
  subscribeRealTimeDashboardCallAccepted,
  subscribeRealTimeDashboardOperatorsStatusesChanged,
  subscribeRealTimeDashboardCallBackAccepted,
  subscribeRealTimeDashboardCallBackDeclined,
} from '@/services/vspSocket/realtimeDashboardSocket';
import store from '@/store';
import {
  REALTIME_DASHBOARD_CALL_FINISHED,
  REALTIME_DASHBOARD_CALL_ACCEPTED,
  REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED,
  REALTIME_DASHBOARD_CLEAR_DATA,
  REALTIME_DASHBOARD_CALLBACK_DECLINED,
  REALTIME_DASHBOARD_CALLBACK_ACCEPTED,
} from '@/store/realtimeDashboard/mutationTypes';
import {
  LOAD_CALLS_ANSWERED_DATA,
  LOAD_CALLS_MISSED_DATA,
  LOAD_CALLBACKS_DATA,
  GET_TENANTS_LIST,
  CHANGE_DASHBOARD_TENANT_FILTER,
  CHANGE_WAITING_CALLS,
  CHANGE_ACTIVE_CALLS,
  CHANGE_WAITING_CALLBACKS,
} from '@/store/realtimeDashboard/actionTypes';
import { getStartOfCurrentDayUTC } from '@/services/dateHelper';

init();

export async function subscribe(tenantId = null) {
  const data = await socketSubscribe(tenantId);
  store.dispatch(CHANGE_DASHBOARD_TENANT_FILTER, data.tenantId);
  self.loadCallsData(data.tenantId);
  return data;
}

export function unsubscribe() {
  store.commit(REALTIME_DASHBOARD_CLEAR_DATA);
  return socketUnsubscribe();
}

export function loadCallsData(tenantId = null) {
  loadCallsAnsweredData(tenantId);
  loadCallsMissedData(tenantId);
  loadCallbacksData(tenantId);
}

export function changeTenant(tenantId) {
  store.commit(REALTIME_DASHBOARD_CLEAR_DATA);
  return self.subscribe(tenantId);
}

export function loadTenantsList() {
  store.dispatch(GET_TENANTS_LIST);
}

function init() {
  subscribeWaitingCallsChanged(onWaitingCallsChanged);
  subscribeWaitingCallbacksChanged(onWaitingCallbacksChanged);
  subscribeActiveCallsChanged(onActiveCallsChanged);
  subscribeRealTimeDashboardCallFinished(onRealTimeDashboardCallFinished);
  subscribeRealTimeDashboardCallAccepted(onRealTimeDashboardCallAccepted);
  subscribeRealTimeDashboardOperatorsStatusesChanged(onRealTimeDashboardOperatorsStatusesChanged);
  subscribeRealTimeDashboardCallBackDeclined(onRealTimeDashboardCallbackDeclinedChanged);
  subscribeRealTimeDashboardCallBackAccepted(onRealTimeDashboardCallbackAcceptedChanged);
  window.addEventListener('online', onBrowserBecomeOnline);
}

function onBrowserBecomeOnline() {
  if (getSubscriptionStatus()) {
    subscribe(getSubscriptionTenant());
  }
}

function onWaitingCallsChanged(data) {
  store.dispatch(CHANGE_WAITING_CALLS, data);
}

function onWaitingCallbacksChanged(data) {
  store.dispatch(CHANGE_WAITING_CALLBACKS, data);
}

function onActiveCallsChanged(data) {
  store.dispatch(CHANGE_ACTIVE_CALLS, data);
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

function onRealTimeDashboardCallbackAcceptedChanged(data) {
  store.commit(REALTIME_DASHBOARD_CALLBACK_ACCEPTED, data);
}

function onRealTimeDashboardCallbackDeclinedChanged(data) {
  store.commit(REALTIME_DASHBOARD_CALLBACK_DECLINED, data);
}

function loadCallsAnsweredData(tenantId = null) {
  const dataAnswered = {
    filters: {
      from: getStartOfCurrentDayUTC(),
      tenantId,
      callType: 'call.video',
      callStatus: 'call.answered',
    },
  };
  store.dispatch(LOAD_CALLS_ANSWERED_DATA, dataAnswered);
}

function loadCallsMissedData(tenantId = null) {
  const dataAbandoned = {
    filters: {
      from: getStartOfCurrentDayUTC(),
      tenantId,
      callType: 'call.video',
      callStatus: 'call.missed',
    },
  };
  store.dispatch(LOAD_CALLS_MISSED_DATA, dataAbandoned);
}

function loadCallbacksData(tenantId = null) {
  const dataCallbacks = {
    filters: {
      from: getStartOfCurrentDayUTC(),
      tenantId,
    },
  };
  store.dispatch(LOAD_CALLBACKS_DATA, dataCallbacks);
}

export const self = {
  loadCallsData,
  subscribe,
};
