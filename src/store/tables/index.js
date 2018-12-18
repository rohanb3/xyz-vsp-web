import { getCustomersTableColumns, getCallsTableColumns } from './columnsList';
import { CUSTOMERS_TABLE, CALLS_TABLE } from './constants';

import mutations from './mutations';

const state = {
  [CUSTOMERS_TABLE]: {
    columns: getCustomersTableColumns(),
  },
  [CALLS_TABLE]: {
    columns: getCallsTableColumns(),
  },
};

export default {
  state,
  mutations,
};
