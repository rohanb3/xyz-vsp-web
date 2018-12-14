import { INSERT_CUSTOMERS, SET_ALL_CUSTOMERS_LENGTH } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [INSERT_CUSTOMERS](state, customers) {
    state.customers.push(...customers);
  },
  [SET_ALL_CUSTOMERS_LENGTH](state, length) {
    state.allCustomersLength = length;
  },
  /* eslint-enable no-param-reassign */
};
