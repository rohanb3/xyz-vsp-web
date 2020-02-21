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
import {
  LOAD_CALLS_ANSWERED_DATA,
  LOAD_CALLS_MISSED_DATA,
  GET_TENANTS_LIST,
  CHANGE_TENANT,
} from '@/store/realtimeDashboard/actionTypes';
import { getStartOfCurrentDayUTC } from '@/services/dateHelper';

init();

export async function subscribe(tenantId = null) {
  return socketSubscribe(tenantId).then(data => {
    store.dispatch(CHANGE_TENANT, data.tenantId);
    loadCallsData(data.tenantId);
  });
}

export function unsubscribe() {
  return socketUnsubscribe();
}

export function loadCallsData(tenantId = null) {
  loadCallsAnsweredData(tenantId);
  loadCallsMissedData(tenantId);
}

export function changeTenant(tenantId) {
  subscribe(tenantId);
}

export function loadTenantsList() {
  store.dispatch(GET_TENANTS_LIST);
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
