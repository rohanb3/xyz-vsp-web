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
  INSERT_CALLS_FEEDBACK,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [INSERT_CUSTOMERS](state, customers) {
    state.customers.push(...customers);
  },
  [SET_ALL_CUSTOMERS_LENGTH](state, length) {
    state.allCustomersLength = length;
  },
  [INSERT_SUPERADMIN_COMPANIES](state, companies) {
    state.superadminCompanies.push(...companies);
  },
  [SET_ALL_SUPERADMIN_COMPANIES_LENGTH](state, length) {
    state.allSuperadminCompaniesLength = length;
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
  [SET_CALL_TYPES_AND_DISPOSITIONS](state, data) {
    state.callTypes = data.types;
    state.dispositions = data.dispositions;
  },
  [INSERT_CALLS_DURATION](state, callDurations) {
    state.callsDuration.push(...callDurations);
  },
  [INSERT_CALLS_FEEDBACK](state, callsFeedback) {
    state.callsFeedback.push(...callsFeedback);
  },
  /* eslint-enable no-param-reassign */
};
