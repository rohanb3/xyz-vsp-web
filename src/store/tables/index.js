import moment from 'moment';
import {
  getCustomersTableColumns,
  getCallsTableColumns,
  getOperatorsTableColumns,
} from './columnsList';
import { CUSTOMERS_TABLE, CALLS_TABLE, OPERATORS_TABLE } from './constants';

import mutations from './mutations';
import getters from './getters';

const state = {
  [CUSTOMERS_TABLE]: {
    columns: getCustomersTableColumns(),
  },
  [OPERATORS_TABLE]: {
    columns: getOperatorsTableColumns(),
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
};

export default {
  state,
  mutations,
  getters,
};
