import { ENTITY_TYPES } from '@/constants';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const { CALLS, DEVICES, DEVICE_COMMENTS, COMPANY_LIST, DEVICE_HISTORY } = ENTITY_TYPES;

export default {
  state: {
    [CALLS]: {
      items: [],
      allItemsLoaded: false,
    },
    [DEVICES]: {
      items: [],
      allItemsLoaded: false,
    },
    [DEVICE_HISTORY]: {
      items: [],
      allItemsLoaded: false,
    },
    [COMPANY_LIST]: {
      items: [],
      allItemsLoaded: false,
    },
    [DEVICE_COMMENTS]: {
      items: [],
      allItemsLoaded: false,
    },
  },
  getters,
  actions,
  mutations,
};
