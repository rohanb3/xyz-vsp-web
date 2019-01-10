import {
  getCustomers,
  getAllCustomersLength,
  getCalls,
  getAllCallsLength,
} from '@/services/repository';

import { getCallsTypes } from '@/services/operatorFeedback';

import {
  LOAD_CUSTOMERS,
  LOAD_ALL_CUSTOMERS_LENGTH,
  LOAD_CALLS,
  LOAD_ALL_CALLS_LENGTH,
  LOAD_CALL_TYPES_AND_DISPOSITIONS,
} from './actionTypes';

import {
  INSERT_CUSTOMERS,
  SET_ALL_CUSTOMERS_LENGTH,
  INSERT_CALLS,
  SET_ALL_CALLS_LENGTH,
  SET_CALL_TYPES_AND_DISPOSITIONS,
} from './mutationTypes';

import { CUSTOMERS_TO_LOAD, CALLS_TO_LOAD } from './constants';

export default {
  async [LOAD_CUSTOMERS]({ commit, getters }) {
    const { loadedCustomersAmount } = getters;
    commit(INSERT_CUSTOMERS, await getCustomers(loadedCustomersAmount, CUSTOMERS_TO_LOAD));
  },
  async [LOAD_ALL_CUSTOMERS_LENGTH]({ commit }) {
    commit(SET_ALL_CUSTOMERS_LENGTH, await getAllCustomersLength());
  },
  async [LOAD_CALLS]({ commit, getters }) {
    const { loadedCallsAmount } = getters;
    commit(INSERT_CALLS, await getCalls(loadedCallsAmount, CALLS_TO_LOAD));
  },
  async [LOAD_ALL_CALLS_LENGTH]({ commit }) {
    commit(SET_ALL_CALLS_LENGTH, await getAllCallsLength());
  },
  async [LOAD_CALL_TYPES_AND_DISPOSITIONS]({ commit }) {
    commit(SET_CALL_TYPES_AND_DISPOSITIONS, await getCallsTypes());
  },
};
