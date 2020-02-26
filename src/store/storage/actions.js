import { getCallsTypes } from '@/services/callRepository';
import {
  LOAD_ITEMS,
  LOAD_MORE_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  LOAD_CALL_TYPES_AND_DISPOSITIONS,
} from './actionTypes';
import {
  INSERT_ITEMS,
  CHANGE_ITEM,
  REMOVE_ITEM,
  SET_ALL_ITEMS_LOADED,
  SET_ITEMS_TOTAL,
  RESET_ITEMS,
  SET_CALL_TYPES_AND_DISPOSITIONS,
} from './mutationTypes';
import { getEntityActions } from './repositoryHelper';
import { ITEMS_TO_LOAD } from './constants';

async function loadItems({ commit, state }, { itemType, filters = {} }, resetPrevious) {
  const { items } = state[itemType];
  const filtersToApply = {
    ...filters,
    offset: resetPrevious ? 0 : items.length,
    limit: ITEMS_TO_LOAD,
  };

  const { getAll } = getEntityActions(itemType);
  const { data, count: total } = await getAll(filtersToApply);

  if (resetPrevious) {
    commit(RESET_ITEMS, itemType);
  }

  commit(INSERT_ITEMS, { itemType, items: data });
  commit(SET_ITEMS_TOTAL, { itemType, total });

  if (data.length < ITEMS_TO_LOAD) {
    commit(SET_ALL_ITEMS_LOADED, itemType);
  }
}

export default {
  [LOAD_ITEMS](store, data) {
    return loadItems(store, data, true);
  },
  [LOAD_MORE_ITEMS](store, data) {
    return loadItems(store, data, false);
  },
  async [CREATE_ITEM]({ commit }, { itemType, ...data }) {
    const { create } = getEntityActions(itemType);
    const createdItem = await create(data);
    commit(INSERT_ITEMS, { itemType, items: [{ ...createdItem, _new: true }] });
  },
  async [UPDATE_ITEM]({ commit }, { itemType, id, mixin = {}, ...updates }) {
    const { update } = getEntityActions(itemType);
    await update(id, updates);
    commit(CHANGE_ITEM, { itemType, id, ...updates, ...mixin });
  },
  async [DELETE_ITEM]({ commit }, { itemType, id }) {
    const { delete: deleteItem } = getEntityActions(itemType);
    await deleteItem(id);
    commit(REMOVE_ITEM, { itemType, id });
  },
  async [LOAD_CALL_TYPES_AND_DISPOSITIONS]({ commit }) {
    commit(SET_CALL_TYPES_AND_DISPOSITIONS, await getCallsTypes());
  },
};
