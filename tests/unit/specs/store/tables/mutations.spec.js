/* eslint-disable import/first */

jest.mock('@/services/tablesColumnsList', () => ({
  getCallsTableColumns() {
    return [{ name: 'date' }, { name: 'operator' }, { name: 'type' }];
  },
}));

import mutations from '@/store/tables/mutations';
import * as types from '@/store/tables/mutationTypes';
import { ENTITY_TYPES } from '@/constants';

xdescribe('tables mutations', () => {
  xdescribe('SET_COLUMNS', () => {
    it('should set columns by tableName', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          columns: [],
        },
      };

      const columns = [{ name: 'operator' }, { name: 'date' }];

      mutations[types.SET_COLUMNS](state, {
        tableName: ENTITY_TYPES.CALLS,
        columns,
      });

      expect(state[ENTITY_TYPES.CALLS].columns).toEqual(columns);
    });
  });

  xdescribe('HIDE_COLUMN', () => {
    it('should remove column', () => {
      const columns = [
        { name: 'clientFeedback' },
        { name: 'operatorFeedback' },
        { name: 'disposition' },
      ];
      const state = {
        [ENTITY_TYPES.CALLS]: {
          columns,
        },
      };

      const expectedColumns = [columns[0], columns[2]];

      mutations[types.HIDE_COLUMN](state, {
        tableName: ENTITY_TYPES.CALLS,
        columnName: 'operatorFeedback',
      });

      expect(state[ENTITY_TYPES.CALLS].columns).toEqual(expectedColumns);
    });
  });

  xdescribe('SET_DATE_RANGE', () => {
    it('should set date range', () => {
      const dateRange = {
        startDate: '2018-12-19T00:00:00Z',
        endDate: '2018-12-19T00:00:00Z',
      };

      const state = {
        [ENTITY_TYPES.CALLS]: {
          dateRange: {
            startDate: null,
            endDate: null,
          },
        },
      };

      mutations[types.SET_DATE_RANGE](state, {
        tableName: ENTITY_TYPES.CALLS,
        dateRange,
      });

      expect(state[ENTITY_TYPES.CALLS].dateRange).toEqual(dateRange);
    });
  });

  xdescribe('SET_FILTER', () => {
    it('should set filter', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          filters: {
            search: '',
          },
          applyingFilters: false,
        },
      };

      mutations[types.SET_FILTER](state, {
        tableName: ENTITY_TYPES.CALLS,
        filter: {
          name: 'search',
          value: 'aaaa',
        },
      });

      expect(state[ENTITY_TYPES.CALLS].filters.search).toBe('aaaa');
      expect(state[ENTITY_TYPES.CALLS].applyingFilters).toBeTruthy();
    });
  });
});
