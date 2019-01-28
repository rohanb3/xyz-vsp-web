import {
  getCallsTableColumns,
  getOperatorsTableColumns,
  getCallsDurationTableColumns,
} from './columnsList';
import * as types from './mutationTypes';
import { CALLS_TABLE, OPERATORS_TABLE, CALLS_DURATION_TABLE } from './constants';

const allColumns = {
  [CALLS_TABLE]: getCallsTableColumns(),
  [OPERATORS_TABLE]: getOperatorsTableColumns(),
  [CALLS_DURATION_TABLE]: getCallsDurationTableColumns(),
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
  [types.SET_DATE_RANGE](state, { tableName, dateRange }) {
    state[tableName].dateRange = dateRange;
  },
  /* eslint-enable no-param-reassign */
};
