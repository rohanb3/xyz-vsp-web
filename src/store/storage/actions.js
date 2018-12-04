import { getCustomers, getAllCustomersLength } from '@/services/repository';
import { LOAD_CUSTOMERS, LOAD_ALL_CUSTOMERS_LENGTH } from './actionTypes';
import { INSERT_CUSTOMERS, SET_ALL_CUSTOMERS_LENGTH } from './mutationTypes';

export default {
  async [LOAD_CUSTOMERS]({ state, commit, getters }) {
    const { loadedCustomersAmount } = getters;
    const { customersToLoad } = state;
    commit(INSERT_CUSTOMERS, await getCustomers(loadedCustomersAmount, customersToLoad));
  },
  async [LOAD_ALL_CUSTOMERS_LENGTH]({ commit }) {
    commit(SET_ALL_CUSTOMERS_LENGTH, await getAllCustomersLength());
  },
};
