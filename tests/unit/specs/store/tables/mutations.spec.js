/* eslint-disable import/first */

jest.mock('@/store/tables/columnsList', () => ({
  getCallsTableColumns() {
    return [{ name: 'date' }, { name: 'operator' }, { name: 'type' }];
  },
}));

import mutations from '@/store/tables/mutations';
import * as types from '@/store/tables/mutationTypes';
import { CALLS_TABLE } from '@/store/tables/constants';

describe('tables mutations', () => {
  describe('SET_COLUMNS', () => {
    it('should set columns by tableName', () => {
      const state = {
        [CALLS_TABLE]: {
          columns: [],
        },
      };

      const columns = [{ name: 'operator' }, { name: 'date' }];

      mutations[types.SET_COLUMNS](state, { tableName: CALLS_TABLE, columns });

      expect(state[CALLS_TABLE].columns).toEqual(columns);
    });
  });

  describe('RESET_COLUMNS', () => {
    it('should set columns by tableName', () => {
      const state = {
        [CALLS_TABLE]: {
          columns: [
            { name: 'clientFeedback' },
            { name: 'operatorFeedback' },
            { name: 'disposition' },
          ],
        },
      };

      const expectedColumns = [{ name: 'date' }, { name: 'operator' }, { name: 'type' }];

      mutations[types.RESET_COLUMNS](state, CALLS_TABLE);

      expect(state[CALLS_TABLE].columns).toEqual(expectedColumns);
    });
  });

  describe('SHOW_COLUMN', () => {
    it('should append column', () => {
      const columns = [
        { name: 'clientFeedback' },
        { name: 'operatorFeedback' },
        { name: 'disposition' },
      ];
      const state = {
        [CALLS_TABLE]: {
          columns,
        },
      };

      const expectedColumns = [...columns, { name: 'type' }];

      mutations[types.SHOW_COLUMN](state, {
        tableName: CALLS_TABLE,
        columnName: 'type',
      });

      expect(state[CALLS_TABLE].columns).toEqual(expectedColumns);
    });
  });

  describe('HIDE_COLUMN', () => {
    it('should remove column', () => {
      const columns = [
        { name: 'clientFeedback' },
        { name: 'operatorFeedback' },
        { name: 'disposition' },
      ];
      const state = {
        [CALLS_TABLE]: {
          columns,
        },
      };

      const expectedColumns = [columns[0], columns[2]];

      mutations[types.HIDE_COLUMN](state, {
        tableName: CALLS_TABLE,
        columnName: 'operatorFeedback',
      });

      expect(state[CALLS_TABLE].columns).toEqual(expectedColumns);
    });
  });
});
