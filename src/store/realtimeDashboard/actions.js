import { getDurations, getCallbacks } from '@/services/realtimeDashboardRepository';
import { getTenantList } from '@/services/getRepository';
import {
  LOAD_CALLS_ANSWERED_DATA,
  LOAD_CALLS_MISSED_DATA,
  GET_TENANTS_LIST,
  CHANGE_DASHBOARD_TENANT_FILTER,
  CHANGE_WAITING_CALLS,
  CHANGE_WAITING_CALLBACKS,
  CHANGE_ACTIVE_CALLS,
  LOAD_CALLBACKS_DATA,
} from './actionTypes';
import {
  INSERT_CALLS_ANSWERED_DATA,
  INSERT_CALLS_MISSED_DATA,
  SET_TENANT_LIST,
  SET_TENANT_ID,
  WAITING_CALLS_CHANGED,
  ACTIVE_CALLS_CHANGED,
  INSERT_CALLBACKS_DATA,
  WAITING_CALLBACKS_CHANGED,
} from './mutationTypes';

async function loadCallsAnsweredData({ commit }, { filters = {} }) {
  const filtersToApply = {
    ...filters,
  };
  const { data } = await getDurations(filtersToApply);
  commit(INSERT_CALLS_ANSWERED_DATA, data);
}

async function loadCallsMissedData({ commit }, { filters = {} }) {
  const filtersToApply = {
    ...filters,
  };
  const { data } = await getDurations(filtersToApply);
  commit(INSERT_CALLS_MISSED_DATA, data);
}

async function loadCallbacksData({ commit }, { filters = {} }) {
  const filtersToApply = {
    ...filters,
  };
  const { data } = await getCallbacks(filtersToApply);
  commit(INSERT_CALLBACKS_DATA, data);
}

async function getTenantsList({ commit, state }) {
  if (!state.tenantsList.length) {
    const data = await getTenantList();
    const result = data.map(t => ({ name: t.name, id: t.id }));
    commit(SET_TENANT_LIST, result);
    return result;
  }
  return state.tenantsList;
}

function fireTenantChanging({ commit }, tenantId) {
  commit(SET_TENANT_ID, tenantId);
}

function changeWaitingCalls({ commit }, data) {
  commit(WAITING_CALLS_CHANGED, data);
}

function changeActiveCalls({ commit }, data) {
  commit(ACTIVE_CALLS_CHANGED, data);
}

function changeWaitingCallbacks({ commit }, data) {
  commit(WAITING_CALLBACKS_CHANGED, data);
}

export default {
  [LOAD_CALLS_ANSWERED_DATA]: loadCallsAnsweredData,
  [LOAD_CALLS_MISSED_DATA]: loadCallsMissedData,
  [GET_TENANTS_LIST]: getTenantsList,
  [CHANGE_DASHBOARD_TENANT_FILTER]: fireTenantChanging,
  [CHANGE_WAITING_CALLS]: changeWaitingCalls,
  [CHANGE_WAITING_CALLBACKS]: changeWaitingCallbacks,
  [CHANGE_ACTIVE_CALLS]: changeActiveCalls,
  [LOAD_CALLBACKS_DATA]: loadCallbacksData,
};
