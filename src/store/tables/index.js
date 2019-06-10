import { getCallsTableColumns, getDevicesTablecolumns } from '@/services/tablesColumnsList';
import { ENTITY_TYPES } from '@/constants';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const { CALLS, DEVICES } = ENTITY_TYPES;

const state = {
  [CALLS]: {
    columns: getCallsTableColumns(),
    filters: {},
    applyingFilters: false,
  },
  [DEVICES]: {
    columns: getDevicesTablecolumns(),
    filters: {},
    applyingFilters: false,
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
