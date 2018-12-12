import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    customersToLoad: 20,
    allCustomersLength: 0,
    callsToLoad: 20,
    allCallsLength: 0,
    customers: [],
    calls: [],
  },
  getters,
  actions,
  mutations,
};
