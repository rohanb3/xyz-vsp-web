import { filterByDateRange } from '@/services/dateHelper';

export default {
  loadedCustomersAmount(state) {
    return state.customers.length;
  },
  allCustomersLoaded({ allCustomersLength }, { loadedCustomersAmount }) {
    return allCustomersLength <= loadedCustomersAmount;
  },
  loadedSuperadminCompaniesAmount(state) {
    return state.superadminCompanies.length;
  },
  allSuperadminCompaniesLoaded(
    { allSuperadminCompaniesLength },
    { loadedSuperadminCompaniesAmount }
  ) {
    return allSuperadminCompaniesLength <= loadedSuperadminCompaniesAmount;
  },
  loadedCallsAmount(state) {
    return state.calls.length;
  },
  loadedOperatorsAmount(state) {
    return state.operators.length;
  },
  loadedSuperadminOperatorsAmount(state) {
    return state.superadminOperators.length;
  },
  allSuperadminOperatorsLoaded(
    { allSuperadminOperatorsLength },
    { loadedSuperadminOperatorsAmount }
  ) {
    return allSuperadminOperatorsLength <= loadedSuperadminOperatorsAmount;
  },
  allOperatorsLoaded({ allOperatorsLength }, { loadedOperatorsAmount }) {
    return allOperatorsLength <= loadedOperatorsAmount;
  },
  allCallsLoaded({ allCustomersLength }, { loadedCustomersAmount }) {
    return allCustomersLength <= loadedCustomersAmount;
  },
  callTypes(state) {
    return state.callTypes;
  },
  dispositions(state) {
    return state.dispositions;
  },
  callsInDateRange({ calls }, { callsTableDateRange }) {
    return filterByDateRange(calls, callsTableDateRange);
  },
  filteredCallsLength(state, { callsInDateRange }) {
    return callsInDateRange.length;
  },
};
