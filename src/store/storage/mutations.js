import Vue from 'vue';
import { ENTITY_TYPES } from '@/constants';
import {
  INSERT_ITEMS,
  UPSERT_ITEMS,
  CHANGE_ITEM,
  REMOVE_ITEM,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  SET_ITEMS_TOTAL,
  SET_CALL_TYPES_AND_DISPOSITIONS,
  CHANGE_DEVICE,
} from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [INSERT_ITEMS](state, { itemType, items }) {
    state[itemType].items.push(...items);
  },
  [UPSERT_ITEMS](state, { itemType, items = [] }) {
    const existedItems = state[itemType].items || [];
    const updatedItems = items.concat(existedItems);
    state[itemType].items = updatedItems;
  },
  [CHANGE_ITEM](state, { itemType, id, ...updates }) {
    const itemIndex = state[itemType].items.findIndex(item => item.id === id);
    if (itemIndex >= 0) {
      const updated = Object.assign({}, state[itemType].items[itemIndex], updates);
      Vue.set(state[itemType].items, itemIndex, updated);
    }
  },
  [REMOVE_ITEM](state, { itemType, id }) {
    const itemIndex = state[itemType].items.findIndex(template => template.id === id);
    if (itemIndex >= 0) {
      Vue.delete(state[itemType].items, itemIndex);
    }
  },
  [RESET_ITEMS](state, itemType) {
    Vue.set(state[itemType], 'items', []);
    Vue.set(state[itemType], 'allItemsLoaded', false);
  },
  [SET_ALL_ITEMS_LOADED](state, itemType) {
    Vue.set(state[itemType], 'allItemsLoaded', true);
  },
  [SET_ITEMS_TOTAL](state, { itemType, total = 0 }) {
    Vue.set(state[itemType], 'total', total);
  },
  [SET_CALL_TYPES_AND_DISPOSITIONS](state, data) {
    state.callTypes = data.types;
    state.dispositions = data.dispositions;
  },
  [CHANGE_DEVICE](state, device) {
    console.log('CHANGE_DEVICE', state, device);
    state[ENTITY_TYPES.DEVICES].items = state[ENTITY_TYPES.DEVICES].items.map(_device => {
      if (_device.id === device.id) {
        Object.assign(_device, device);
      }
      return _device;
    });
  },
  /* eslint-enable no-param-reassign */
};
