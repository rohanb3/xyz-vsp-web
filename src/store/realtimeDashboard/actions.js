import {
  LOAD_CALLS_ANSWERED_DATA,
  LOAD_CALLS_MISSED_DATA,
  GET_TENANTS_LIST,
  CHANGE_TENANT,
} from './actionTypes';
import {
  INSERT_CALLS_ANSWERED_DATA,
  INSERT_CALLS_MISSED_DATA,
  SET_TENANT_LIST,
  SET_TENANT_ID,
} from './mutationTypes';
import { getDurations } from '@/services/realtimeDashboardRepository';
import { getTenantList } from '@/services/getRepository';
import store from '@/store';

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

async function getTenantsList({ commit }) {
  const realState = store.state.realtimeDashboard;
  const tenants = realState.tenantsList;
  if (!tenants.length) {
    const data = await getTenantList();
    const result = [];
    data.forEach(t => {
      result.push({
        name: t.name,
        id: t.id,
      });
    });
    commit(SET_TENANT_LIST, result);
  }
}

function fireTenantChanging({ commit }, tenantId) {
  commit(SET_TENANT_ID, tenantId);
}

export default {
  [LOAD_CALLS_ANSWERED_DATA]: loadCallsAnsweredData,
  [LOAD_CALLS_MISSED_DATA]: loadCallsMissedData,
  [GET_TENANTS_LIST]: getTenantsList,
  [CHANGE_TENANT]: fireTenantChanging,
};
