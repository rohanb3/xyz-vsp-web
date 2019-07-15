import {
  getCallsTableColumns,
  getDevicesTablecolumns,
  getCommentTableColumns,
  getDeviceHistoryTableColumns,
} from '@/services/tablesColumnsList';

import { ENTITY_TYPES } from '@/constants';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import getDefaultFilters from './filtersHelper';

const { CALLS, DEVICES, DEVICE_COMMENTS, DEVICE_HISTORY } = ENTITY_TYPES;

const state = {
  [CALLS]: {
    columns: getCallsTableColumns(),
    filters: {},
    applyingFilters: false,
  },
  [DEVICES]: {
    columns: getDevicesTablecolumns(),
    filters: getDefaultFilters(DEVICES),
    applyingFilters: false,
  },
  [DEVICE_HISTORY]: {
    columns: getDeviceHistoryTableColumns(),
    filters: {
      deviceId: null,
    },
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
