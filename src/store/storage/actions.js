import {
  getCustomers,
  getAllCustomersLength,
  getSuperadminCompanies,
  getAllSuperadminCompaniesLength,
  getCalls,
  getAllCallsLength,
  getOperators,
  getAllOperatorsLength,
  getCallsDuration,
} from '@/services/repository';

import { getCallsTypes } from '@/services/operatorFeedback';

import {
  LOAD_CUSTOMERS,
  LOAD_ALL_CUSTOMERS_LENGTH,
  LOAD_SUPERADMIN_COMPANIES,
  LOAD_SUPERADMIN_COMPANIES_LENGTH,
  LOAD_CALLS,
  LOAD_ALL_CALLS_LENGTH,
  LOAD_OPERATORS,
  LOAD_ALL_OPERATORS_LENGTH,
  LOAD_CALL_TYPES_AND_DISPOSITIONS,
  LOAD_CALLS_DURATION,
} from './actionTypes';

import {
  INSERT_CUSTOMERS,
  SET_ALL_CUSTOMERS_LENGTH,
  INSERT_SUPERADMIN_COMPANIES,
  SET_ALL_SUPERADMIN_COMPANIES_LENGTH,
  INSERT_CALLS,
  SET_ALL_CALLS_LENGTH,
  INSERT_OPERATORS,
  SET_ALL_OPERATORS_LENGTH,
  SET_CALL_TYPES_AND_DISPOSITIONS,
  INSERT_CALLS_DURATION,
} from './mutationTypes';

import {
  CUSTOMERS_TO_LOAD,
  SUPERADMIN_COMPANIES_TO_LOAD,
  CALLS_TO_LOAD,
  OPERATORS_TO_LOAD,
} from './constants';

export default {
  async [LOAD_CUSTOMERS]({ commit, getters }) {
    const { loadedCustomersAmount } = getters;
    commit(INSERT_CUSTOMERS, await getCustomers(loadedCustomersAmount, CUSTOMERS_TO_LOAD));
  },
  async [LOAD_ALL_CUSTOMERS_LENGTH]({ commit }) {
    commit(SET_ALL_CUSTOMERS_LENGTH, await getAllCustomersLength());
  },
  async [LOAD_SUPERADMIN_COMPANIES]({ commit, getters }) {
    const { loadedSuperadminCompaniesAmount } = getters;
    commit(
      INSERT_SUPERADMIN_COMPANIES,
      await getSuperadminCompanies(loadedSuperadminCompaniesAmount, SUPERADMIN_COMPANIES_TO_LOAD)
    );
  },
  async [LOAD_SUPERADMIN_COMPANIES_LENGTH]({ commit }) {
    commit(SET_ALL_SUPERADMIN_COMPANIES_LENGTH, await getAllSuperadminCompaniesLength());
  },
  async [LOAD_CALLS]({ commit, getters }) {
    const { loadedCallsAmount } = getters;
    commit(INSERT_CALLS, await getCalls(loadedCallsAmount, CALLS_TO_LOAD));
  },
  async [LOAD_ALL_CALLS_LENGTH]({ commit }) {
    commit(SET_ALL_CALLS_LENGTH, await getAllCallsLength());
  },
  async [LOAD_OPERATORS]({ commit, getters }) {
    const { loadedOperatorsAmount } = getters;
    commit(INSERT_OPERATORS, await getOperators(loadedOperatorsAmount, OPERATORS_TO_LOAD));
  },
  async [LOAD_ALL_OPERATORS_LENGTH]({ commit }) {
    commit(SET_ALL_OPERATORS_LENGTH, await getAllOperatorsLength());
  },
  async [LOAD_CALL_TYPES_AND_DISPOSITIONS]({ commit }) {
    commit(SET_CALL_TYPES_AND_DISPOSITIONS, await getCallsTypes());
  },
  async [LOAD_CALLS_DURATION]({ commit }) {
    commit(INSERT_CALLS_DURATION, await getCallsDuration());
  },
};
