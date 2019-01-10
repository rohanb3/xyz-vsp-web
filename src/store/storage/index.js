import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    allOperatorsLength: 0,
    allCustomersLength: 0,
    allCallsLength: 0,
    operators: [],
    customers: [],
    calls: [],
    callTypes: [],
    dispositions: [],
  },
  getters,
  actions,
  mutations,
};
