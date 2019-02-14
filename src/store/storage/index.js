import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    allOperatorsLength: 0,
    allCustomersLength: 0,
    allSuperadminCompaniesLength: 0,
    allCallsLength: 0,
    allSuperadminOperatorsLength: 0,
    allPaymentsLength: 0,
    operators: [],
    customers: [],
    superadminCompanies: [],
    calls: [],
    callTypes: [],
    dispositions: [],
    callsDuration: [],
    callsFeedback: [],
    superadminOperators: [],
    payments: [],
  },
  getters,
  actions,
  mutations,
};
