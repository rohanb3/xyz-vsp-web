import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { ENTITY_TYPES } from '@/constants';

const { CALLS, DEVICES, DEVICE_COMMENTS } = ENTITY_TYPES;

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
    [DEVICE_COMMENTS]: {
      items: [],
      allItemsLoaded: false,
    },
  },
  getters,
  actions,
  mutations,
};
