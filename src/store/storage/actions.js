import {
  getCustomers,
  getAllCustomersLength,
  getCalls,
  getAllCallsLength,
} from '@/services/repository';
import {
  LOAD_CUSTOMERS,
  LOAD_ALL_CUSTOMERS_LENGTH,
  LOAD_CALLS,
  LOAD_ALL_CALLS_LENGTH,
} from './actionTypes';
import {
  INSERT_CUSTOMERS,
  SET_ALL_CUSTOMERS_LENGTH,
  INSERT_CALLS,
  SET_ALL_CALLS_LENGTH,
} from './mutationTypes';

export default {
  async [LOAD_CUSTOMERS]({ state, commit, getters }) {
    const { loadedCustomersAmount } = getters;
    const { customersToLoad } = state;
    commit(INSERT_CUSTOMERS, await getCustomers(loadedCustomersAmount, customersToLoad));
  },
  async [LOAD_ALL_CUSTOMERS_LENGTH]({ commit }) {
    commit(SET_ALL_CUSTOMERS_LENGTH, await getAllCustomersLength());
  },
  async [LOAD_CALLS]({ state, commit, getters }) {
    const { loadedCallsAmount } = getters;
    const { callsToLoad } = state;
    commit(INSERT_CALLS, await getCalls(loadedCallsAmount, callsToLoad));
  },
  async [LOAD_ALL_CALLS_LENGTH]({ commit }) {
    commit(SET_ALL_CALLS_LENGTH, await getAllCallsLength());
  },
};
