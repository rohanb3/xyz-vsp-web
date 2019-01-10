import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    allCustomersLength: 0,
    allCallsLength: 0,
    customers: [],
    calls: [],
    callTypes: [],
    dispositions: [],
  },
  getters,
  actions,
  mutations,
};
