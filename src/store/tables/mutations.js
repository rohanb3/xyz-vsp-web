import * as types from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [types.SET_COLUMNS](state, { tableName, columns }) {
    state[tableName].columns = columns;
  },
  /* eslint-enable no-param-reassign */
};
