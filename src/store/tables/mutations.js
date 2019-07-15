import Vue from 'vue';
import * as types from './mutationTypes';
import getDefaultFilters from './filtersHelper';

export default {
  /* eslint-disable no-param-reassign */
  [types.SET_COLUMNS](state, { tableName, columns }) {
    state[tableName].columns = columns;
  },
  [types.HIDE_COLUMN](state, { tableName, columnName }) {
    state[tableName].columns = state[tableName].columns.filter(
      column => column.name !== columnName
    );
  },
  [types.SET_DATE_RANGE](state, { tableName, dateRange }) {
    state[tableName].dateRange = dateRange;
  },
  [types.SET_FILTER](state, { tableName, filter = {} }) {
    if (state[tableName] && state[tableName].filters && filter.name) {
      state[tableName].applyingFilters = true;
      state[tableName].filters[filter.name] = filter.value;
    }
  },
  [types.SET_FILTERS](state, { tableName, filters = [] }) {
    state[tableName].applyingFilters = true;
    filters.forEach(({ name, value }) => {
      if (state[tableName] && state[tableName].filters) {
        state[tableName].filters[name] = value;
      }
    });
  },
  [types.RESET_FILTERS](state, tableName) {
    Vue.set(state[tableName], 'filters', getDefaultFilters(tableName));
  },
  [types.APPLYING_FILTERS_DONE](state, tableName) {
    state[tableName].applyingFilters = false;
  },
  /* eslint-enable no-param-reassign */
};
