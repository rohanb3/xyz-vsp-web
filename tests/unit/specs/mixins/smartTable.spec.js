import smartTable from '@/mixins/smartTable';
import { SET_COLUMNS } from '@/store/tables/mutationTypes';

describe('smartTable mixin', () => {
  describe('onColumnsReordered', () => {
    it('should commit columns to store', async () => {
      const columns = [{ id: 123 }, { id: 321 }];
      const fakeThis = {
        tableName: 'hawkwind',
        $store: {
          commit: jest.fn(),
        },
      };

      const expectedData = {
        tableName: 'hawkwind',
        columns,
      };

      smartTable.methods.onColumnsReordered.call(fakeThis, columns);

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(SET_COLUMNS, expectedData);
    });
  });

  describe('onColumnsResized', () => {
    it('should commit columns to store', async () => {
      const columns = [{ id: 123, width: 200, name: 'user' }, { id: 321, width: 300, name: 'media' }];
      const updates = {
        media: 400,
      };
      const fakeThis = {
        tableName: 'hawkwind',
        columns,
        $store: {
          commit: jest.fn(),
        },
      };

      const expectedColumns = [{ id: 123, width: 200, name: 'user' }, { id: 321, width: 400, name: 'media' }];
      const expectedData = {
        tableName: 'hawkwind',
        columns: expectedColumns,
      };

      smartTable.methods.onColumnsResized.call(fakeThis, updates);

      expect(fakeThis.$store.commit).toHaveBeenCalledWith(SET_COLUMNS, expectedData);
    });
  });
});
