import { filterByDateRange } from '@/services/dateHelper';

export default {
  loadedCustomersAmount(state) {
    return state.customers.length;
  },
  allCustomersLoaded({ allCustomersLength }, { loadedCustomersAmount }) {
    return allCustomersLength <= loadedCustomersAmount;
  },
  loadedCallsAmount(state) {
    return state.calls.length;
  },
  allCallsLoaded({ allCustomersLength }, { loadedCustomersAmount }) {
    return allCustomersLength <= loadedCustomersAmount;
  },
  callsInDateRange({ calls }, { callsTableDateRange }) {
    return filterByDateRange(calls, callsTableDateRange);
  },
  filteredCallsLength(state, { callsInDateRange }) {
    return callsInDateRange.length;
  },
};
