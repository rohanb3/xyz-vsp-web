import { mapCallInfo } from './utils';

export default {
  allWaitingCalls(state, getters) {
    return [...getters.waitingCallbacks.items, ...getters.waitingCalls.items];
  },
  waitingCallbacks(state, getters, rootState, rootGetters) {
    const data = state.waitingCallbacks;
    const currentTenantUsers = rootGetters.tenantUsers[rootGetters.tenantId] || {};
    const currentTenantCompanies = rootGetters.tenantCompanies[rootGetters.tenantId] || {};

    const expandedData = {
      ...data,
      items: data.items
        .map(call =>
          mapCallInfo(call, currentTenantUsers, currentTenantCompanies, rootGetters.allDevices)
        )
        .sort((first, second) => (first.requestedAt > second.requestedAt ? 1 : -1)),
    };

    return expandedData;
  },
  waitingCalls(state, getters, rootState, rootGetters) {
    const data = state.waitingCalls;
    const currentTenantUsers = rootGetters.tenantUsers[rootGetters.tenantId] || {};
    const currentTenantCompanies = rootGetters.tenantCompanies[rootGetters.tenantId] || {};

    const expandedData = {
      ...data,
      items: data.items
        .map(call =>
          mapCallInfo(call, currentTenantUsers, currentTenantCompanies, rootGetters.allDevices)
        )
        .sort((first, second) => (first.requestedAt > second.requestedAt ? 1 : -1)),
    };

    return expandedData;
  },
  activeCalls(state, getters, rootState, rootGetters) {
    const data = state.activeCalls;
    const currentTenantUsers = rootGetters.tenantUsers[rootGetters.tenantId] || {};
    const currentTenantCompanies = rootGetters.tenantCompanies[rootGetters.tenantId] || {};

    const expandedData = {
      ...data,
      items: data.items
        .map(item => {
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
        })
        .sort((first, second) => (first.acceptedAt > second.acceptedAt ? -1 : 1)),
    };
    return expandedData;
  },
  allWaitingCallsCount(state, getters) {
    return getters.allWaitingCalls.length;
  },
  waitingCallbacksCount(state) {
    return (state.waitingCallbacks && state.waitingCallbacks.count) || 0;
  },
  waitingCallsCount(state) {
    return (state.waitingCalls && state.waitingCalls.count) || 0;
  },
  activeCallsCount(state) {
    return (state.activeCalls && state.activeCalls.count) || 0;
  },
  operatorsOffline(state) {
    return state.operatorsOffline || 0;
  },
  operatorsOnCall(state) {
    return state.operatorsOnCall || 0;
  },
  operatorsAvailable(state) {
    return state.operatorsAvailable || 0;
  },
  callStatisticsAnswered(state) {
    return state.callStatisticsAnswered;
  },
  callStatisticsAbandoned(state) {
    return state.callStatisticsAbandoned;
  },
  tenantsList(state) {
    return state.tenantsList;
  },
  tenantId(state) {
    return state.tenantId;
  },
  callStatisticsCallbacksMissed(state) {
    return state.callStatisticsCallbacksMissed;
  },
  callStatisticsCallbacksAnswered(state) {
    return state.callStatisticsCallbacksAnswered;
  },
};
