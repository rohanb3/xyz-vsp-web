import { LOAD_ITEMS } from '@/store/storage/actionTypes';
import * as actionTypes from './actionTypes';
import * as mutationTypes from './mutationTypes';

export default {
  [actionTypes.APPLY_FILTERS]({ state, commit, dispatch }, { tableName, filters = [] }) {
    commit(mutationTypes.SET_FILTERS, { tableName, filters });
    const allFilters = state[tableName].filters;
    return dispatch(LOAD_ITEMS, {
      itemType: tableName,
      filters: allFilters,
    }).finally(() => {
      commit(mutationTypes.APPLYING_FILTERS_DONE, tableName);
    });
  },
  [actionTypes.RESET_FILTERS]({ commit, dispatch }, tableName) {
    commit(mutationTypes.RESET_FILTERS, tableName);
    return dispatch(LOAD_ITEMS, { itemType: tableName });
  },
};
