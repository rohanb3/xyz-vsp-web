import {
  INSERT_CUSTOMERS,
  SET_ALL_CUSTOMERS_LENGTH,
  INSERT_CALLS,
  SET_ALL_CALLS_LENGTH,
  INSERT_OPERATORS,
  SET_ALL_OPERATORS_LENGTH,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [INSERT_CUSTOMERS](state, customers) {
    state.customers.push(...customers);
  },
  [SET_ALL_CUSTOMERS_LENGTH](state, length) {
    state.allCustomersLength = length;
  },
  [INSERT_CALLS](state, calls) {
    state.calls.push(...calls);
  },
  [SET_ALL_CALLS_LENGTH](state, length) {
    state.allCallsLength = length;
  },
  [INSERT_OPERATORS](state, operators) {
    state.operators.push(...operators);
  },
  [SET_ALL_OPERATORS_LENGTH](state, length) {
    state.allOperatorsLength = length;
  },
  /* eslint-enable no-param-reassign */
};
