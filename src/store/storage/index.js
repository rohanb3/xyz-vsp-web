import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    customersToLoad: 10,
    allCustomersLength: 0,
    customers: [],
  },
  getters,
  actions,
  mutations,
};
