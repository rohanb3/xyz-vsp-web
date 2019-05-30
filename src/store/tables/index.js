import { getCallsTableColumns } from '@/services/tablesColumnsList';
import { ENTITY_TYPES } from '@/constants';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const { CALLS } = ENTITY_TYPES;

const state = {
  [CALLS]: {
    columns: getCallsTableColumns(),
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
