import lazyLoadTable from '@/mixins/lazyLoadTable';
import { LOAD_ITEMS } from '@/store/storage/actionTypes';

const tableName = 'test';

describe('lazyLoadTable mixin: ', () => {
  describe('checkAndLoadItems(): ', () => {
    it('should do nothing if all aitems were loaded', () => {
      const mockedThis = {
        allItemsLoaded: true,
        loadMoreItems: jest.fn(),
        tableName,
      };

      lazyLoadTable.methods.checkAndLoadItems.call(mockedThis);

      expect(mockedThis.loadMoreItems).not.toHaveBeenCalled();
    });

    it('should load more items if not all were loaded', () => {
      const mockedThis = {
        allItemsLoaded: false,
        loadMoreItems: jest.fn(),
      };

      lazyLoadTable.methods.checkAndLoadItems.call(mockedThis);

      expect(mockedThis.loadMoreItems).toHaveBeenCalled();
    });
  });

  describe('loadItems(): ', () => {
    it('should load actions', () => {
      const filters = {};
      const mockedThis = {
        $store: {
          dispatch: jest.fn(() => Promise.resolve()),
        },
        tableName,
        filters,
        loading: false,
      };

      const loadingPromise = lazyLoadTable.methods.loadItems.call(mockedThis);

      expect(mockedThis.loading).toBeTruthy();

      return loadingPromise.then(() => {
        expect(mockedThis.loading).toBeFalsy();
        expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(LOAD_ITEMS, {
          itemType: tableName,
          filters,
        });
      });
    });
  });
});
