import {
  getCallsTableColumns,
  getDevicesTablecolumns,
  getCommentTableColumns,
} from '@/services/tablesColumnsList';
import { ENTITY_TYPES } from '@/constants';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const { CALLS, DEVICES, DEVICE_COMMENTS } = ENTITY_TYPES;

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
  [DEVICE_COMMENTS]: {
    columns: getCommentTableColumns(),
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
