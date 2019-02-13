import moment from 'moment';
import {
  getCustomersTableColumns,
  getSuperadminCompaniesTableColumns,
  getCallsTableColumns,
  getOperatorsTableColumns,
  getCallsDurationTableColumns,
  getCallsFeedbackTableColumns,
  getSuperadminOperatorsTableColumns,
  getPaymentsTableColumns,
} from '@/services/tablesColumnsList';
import {
  CUSTOMERS_TABLE,
  CALLS_TABLE,
  OPERATORS_TABLE,
  CALLS_DURATION_TABLE,
  CALLS_FEEDBACK_TABLE,
  SUPERADMIN_COMPANIES_TABLE,
  SUPERADMIN_OPERATORS_TABLE,
  PAYMENTS_TABLE,
} from '@/constants/tablesNames';

import mutations from './mutations';
import getters from './getters';

const state = {
  [CUSTOMERS_TABLE]: {
    columns: getCustomersTableColumns(),
  },
  [SUPERADMIN_COMPANIES_TABLE]: {
    columns: getSuperadminCompaniesTableColumns(),
  },
  [CALLS_DURATION_TABLE]: {
    columns: getCallsDurationTableColumns(),
  },
  [CALLS_FEEDBACK_TABLE]: {
    columns: getCallsFeedbackTableColumns(),
  },
  [OPERATORS_TABLE]: {
    columns: getOperatorsTableColumns(),
  },
  [SUPERADMIN_OPERATORS_TABLE]: {
    columns: getSuperadminOperatorsTableColumns(),
  },
  [CALLS_TABLE]: {
    columns: getCallsTableColumns(),
    dateRange: {
      startDate: moment
        .utc()
        .subtract(1, 'month')
        .startOf('day')
        .format(),
      endDate: moment
        .utc()
        .endOf('day')
        .format(),
    },
  },
  [PAYMENTS_TABLE]: {
    columns: getPaymentsTableColumns(),
  },
};

export default {
  state,
  mutations,
  getters,
};
