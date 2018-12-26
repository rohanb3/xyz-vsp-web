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
  callTypes(state) {
    return state.callTypes;
  },
  dispositions(state) {
    return state.dispositions;
  },
};
