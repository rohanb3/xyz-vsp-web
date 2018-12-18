import moment from 'moment';
import { getCustomersTableColumns, getCallsTableColumns } from './columnsList';
import { CUSTOMERS_TABLE, CALLS_TABLE } from './constants';

import mutations from './mutations';

const state = {
  [CUSTOMERS_TABLE]: {
    columns: getCustomersTableColumns(),
  },
  [CALLS_TABLE]: {
    columns: getCallsTableColumns(),
    startDate: moment
      .utc()
      .subtract(1, 'month')
      .format(),
    endDate: moment.utc().format(),
  },
};

export default {
  state,
  mutations,
};
