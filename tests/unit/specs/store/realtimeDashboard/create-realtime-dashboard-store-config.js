import mutations from '@/store/realtimeDashboard/mutations';
import getters from '@/store/realtimeDashboard/getters';
import actions from '@/store/realtimeDashboard/actions';

export default function createRealTimeDashboardStoreConfig() {
  const state = {
    waitingCalls: {},
    activeCalls: {},
    operatorsOffline: null,
    operatorsOnline: null,
    operatorsOnCall: null,
    operatorsAvailable: null,
    callStatisticsAnswered: {},
    callStatisticsAbandoned: {},
    tenantsList: [],
    tenantId: null,
  };

  return {
    state,
    actions,
    mutations,
    getters,
  };
}
