import { getDurations } from '@/services/realtimeDashboardRepository';
import { getTenantList } from '@/services/getRepository';
import {
  LOAD_CALLS_ANSWERED_DATA,
  LOAD_CALLS_MISSED_DATA,
  GET_TENANTS_LIST,
  CHANGE_DASHBOARD_TENANT_FILTER,
} from './actionTypes';
import {
  INSERT_CALLS_ANSWERED_DATA,
  INSERT_CALLS_MISSED_DATA,
  SET_TENANT_LIST,
  SET_TENANT_ID,
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

export default {
  [LOAD_CALLS_ANSWERED_DATA]: loadCallsAnsweredData,
  [LOAD_CALLS_MISSED_DATA]: loadCallsMissedData,
  [GET_TENANTS_LIST]: getTenantsList,
  [CHANGE_DASHBOARD_TENANT_FILTER]: fireTenantChanging,
};
