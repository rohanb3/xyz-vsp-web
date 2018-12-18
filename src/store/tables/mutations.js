import { getCallsTableColumns } from './columnsList';
import * as types from './mutationTypes';
import { CALLS_TABLE } from './constants';

const allColumns = {
  [CALLS_TABLE]: getCallsTableColumns(),
};

export default {
  /* eslint-disable no-param-reassign */
  [types.SET_COLUMNS](state, { tableName, columns }) {
    state[tableName].columns = columns;
  },
  [types.RESET_COLUMNS](state, tableName) {
    state[tableName].columns = [...allColumns[tableName]];
  },
  [types.SHOW_COLUMN](state, { tableName, columnName }) {
    const columnToShow = allColumns[tableName].find(column => column.name === columnName);
    state[tableName].columns.push(columnToShow);
  },
  [types.HIDE_COLUMN](state, { tableName, columnName }) {
    state[tableName].columns = state[tableName].columns.filter(
      column => column.name !== columnName
    );
  },
  /* eslint-enable no-param-reassign */
};
