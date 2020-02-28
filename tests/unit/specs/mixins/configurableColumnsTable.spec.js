import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import { SET_COLUMNS, RESET_COLUMNS, SHOW_COLUMN, HIDE_COLUMN } from '@/store/tables/mutationTypes';

let fakeThis;

xdescribe('configurableColumnsTable mixin', () => {
  beforeEach(() => {
    fakeThis = {
      tableName: 'hawkwind',
      $store: {
        commit: jest.fn(),
      },
    };
  });

  xdescribe('onColumnsReordered()', () => {
    it('should commit columns to store', async () => {
      const columns = [{ id: 123 }, { id: 321 }];

      const expectedData = {
        tableName: 'hawkwind',
        columns,
      };

      configurableColumnsTable.methods.onColumnsReordered.call(fakeThis, columns);

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(SET_COLUMNS, expectedData);
    });
  });

  xdescribe('onColumnsResized()', () => {
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

      configurableColumnsTable.methods.onColumnsResized.call(fakeThis, updates);

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(SET_COLUMNS, expectedData);
    });
  });

  xdescribe('onColumnVisibilityChanged()', () => {
    it('should show column if visible', () => {
      const expectedData = {
        tableName: 'hawkwind',
        columnName: 'user',
      };

      configurableColumnsTable.methods.onColumnVisibilityChanged.call(fakeThis, {
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

      configurableColumnsTable.methods.onColumnVisibilityChanged.call(fakeThis, {
        name: 'user',
        value: false,
      });

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(HIDE_COLUMN, expectedData);
    });
  });

  xdescribe('setDefaultColumns()', () => {
    it('should commit to store', () => {
      configurableColumnsTable.methods.setDefaultColumns.call(fakeThis);
      expect(fakeThis.$store.commit).toHaveBeenCalledWith(RESET_COLUMNS, 'hawkwind');
    });
  });
});
