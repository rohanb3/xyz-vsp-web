import { getDurations } from '@/services/realtimeDashboardRepository';
import { getTenantList } from '@/services/getRepository';
import {
  LOAD_CALLS_ANSWERED_DATA,
  LOAD_CALLS_MISSED_DATA,
  GET_TENANTS_LIST,
  CHANGE_DASHBOARD_TENANT_FILTER,
  CHANGE_WAITING_CALLS,
  CHANGE_ACTIVE_CALLS,
} from './actionTypes';
import {
  INSERT_CALLS_ANSWERED_DATA,
  INSERT_CALLS_MISSED_DATA,
  SET_TENANT_LIST,
  SET_TENANT_ID,
  WAITING_CALLS_CHANGED,
  ACTIVE_CALLS_CHANGED,
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

function changeWaitingCalls({ commit, rootGetters }, data) {
  const currentTenantUsers = rootGetters.tenantUsers[rootGetters.tenantId] || {};
  const currentTenantCompanies = rootGetters.tenantCompanies[rootGetters.tenantId] || {};

  const expandedData = {
    ...data,
    items: data.items.map(item => {
      const salesRep = currentTenantUsers[item.salesRepId] || {};

      const company = currentTenantCompanies[salesRep.companyId] || {};
      const device = rootGetters.allDevices[item.deviceId] || {};

      return {
        ...item,
        deviceName: device.deviceName || 'N/A',
        companyName: company.companyName || 'N/A',
        salesRepName: salesRep.userName || item.salesRepId,
      };
    }),
  };

  commit(WAITING_CALLS_CHANGED, expandedData);
}
function changeActiveCalls({ commit, rootGetters }, data) {
  const currentTenantUsers = rootGetters.tenantUsers[rootGetters.tenantId] || {};
  const currentTenantCompanies = rootGetters.tenantCompanies[rootGetters.tenantId] || {};

  const expandedData = {
    ...data,
    items: data.items.map(item => {
      const salesRep = currentTenantUsers[item.salesRepId] || {};
      const operator = currentTenantUsers[item.acceptedBy] || {};

      const company = currentTenantCompanies[salesRep.companyId] || {};
      const device = rootGetters.allDevices[item.deviceId] || {};

      return {
        ...item,
        deviceName: device.deviceName || 'N/A',
        companyName: company.companyName || 'N/A',
        salesRepName: salesRep.userName || item.salesRepId,
        operatorName: operator.userName || item.acceptedBy,
      };
    }),
  };

  commit(ACTIVE_CALLS_CHANGED, expandedData);
}

export default {
  [LOAD_CALLS_ANSWERED_DATA]: loadCallsAnsweredData,
  [LOAD_CALLS_MISSED_DATA]: loadCallsMissedData,
  [GET_TENANTS_LIST]: getTenantsList,
  [CHANGE_DASHBOARD_TENANT_FILTER]: fireTenantChanging,
  [CHANGE_WAITING_CALLS]: changeWaitingCalls,
  [CHANGE_ACTIVE_CALLS]: changeActiveCalls,
};
