import smartTable from '@/mixins/smartTable';
import {
  SET_COLUMNS,
  RESET_COLUMNS,
  SHOW_COLUMN,
  HIDE_COLUMN,
  SET_DATE_RANGE,
} from '@/store/tables/mutationTypes';

let fakeThis;

describe('smartTable mixin', () => {
  beforeEach(() => {
    fakeThis = {
      tableName: 'hawkwind',
      $store: {
        commit: jest.fn(),
      },
    };
  });

  describe('onColumnsReordered()', () => {
    it('should commit columns to store', async () => {
      const columns = [{ id: 123 }, { id: 321 }];

      const expectedData = {
        tableName: 'hawkwind',
        columns,
      };

      smartTable.methods.onColumnsReordered.call(fakeThis, columns);

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(SET_COLUMNS, expectedData);
    });
  });

  describe('onColumnsResized()', () => {
    it('should commit columns to store', async () => {
      const columns = [
        { id: 123, width: 200, name: 'user' },
        { id: 321, width: 300, name: 'media' },
      ];

      const updates = {
        media: 400,
      };

      const expectedColumns = [
        { id: 123, width: 200, name: 'user' },
        { id: 321, width: 400, name: 'media' },
      ];

      const expectedData = {
        tableName: 'hawkwind',
        columns: expectedColumns,
      };

      fakeThis.columns = columns;

      smartTable.methods.onColumnsResized.call(fakeThis, updates);

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(SET_COLUMNS, expectedData);
    });
  });

  describe('onColumnVisibilityChanged()', () => {
    it('should show column if visible', () => {
      const expectedData = {
        tableName: 'hawkwind',
        columnName: 'user',
      };

      smartTable.methods.onColumnVisibilityChanged.call(fakeThis, {
        name: 'user',
        value: true,
      });

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(SHOW_COLUMN, expectedData);
    });

    it('should hide column if not visible', () => {
      const expectedData = {
        tableName: 'hawkwind',
        columnName: 'user',
      };

      smartTable.methods.onColumnVisibilityChanged.call(fakeThis, {
        name: 'user',
        value: false,
      });

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(HIDE_COLUMN, expectedData);
    });
  });

  describe('setDefaultColumns()', () => {
    it('should commit to store', () => {
      smartTable.methods.setDefaultColumns.call(fakeThis);
      expect(fakeThis.$store.commit).toHaveBeenCalledWith(RESET_COLUMNS, 'hawkwind');
    });
  });

  describe('setDateRange()', () => {
    it('should commit to store', () => {
      const dateRange = {
        startDate: '2018-12-19T00:00:00Z',
        endDate: '2018-12-19T00:00:00Z',
      };

      smartTable.methods.setDateRange.call(fakeThis, dateRange);
      expect(fakeThis.$store.commit).toHaveBeenCalledWith(SET_DATE_RANGE, {
        tableName: 'hawkwind',
        dateRange,
      });
    });
  });
});
