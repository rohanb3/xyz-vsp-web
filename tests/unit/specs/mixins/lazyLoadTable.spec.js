import lazyLoadTable from '@/mixins/lazyLoadTable';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';
import { RESET_ITEMS } from '@/store/storage/mutationTypes';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { RESET_FILTERS } from '@/store/tables/mutationTypes';

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
  describe('loadMoreItems(): ', () => {
    it('should call actions LOAD_MORE_ITEMS', () => {
      const filters = { date: '2019.06.01' };
      const mockedThis = {
        loading: true,
        loadOptions: 123,
        tableName,
        filters,
        $store: {
          dispatch: jest.fn(() => ({ finally: jest.fn() })),
        },
      };

      lazyLoadTable.methods.loadMoreItems.call(mockedThis);

      const expectedResult = {
        itemType: tableName,
        filters,
      };

      expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(LOAD_MORE_ITEMS, expectedResult);
    });

    it('After load items should set loading as false', () => {
      const finallyMock = jest.fn(func => func());
      const mockedThis = {
        loading: true,
        loadOptions: 123,
        tableName,

        $store: {
          dispatch: jest.fn(() => ({ finally: finallyMock })),
        },
      };

      lazyLoadTable.methods.loadMoreItems.call(mockedThis);

      expect(mockedThis.loading).toBeFalsy();
    });
  });
  describe('resetItems(): ', () => {
    it('should call mutation RESET_ITEMS', () => {
      const mockedThis = {
        $store: {
          commit: jest.fn(),
        },
        tableName,
      };

      lazyLoadTable.methods.resetItems.call(mockedThis);

      expect(mockedThis.$store.commit).toHaveBeenCalledWith(RESET_ITEMS, tableName);
    });
  });
  describe('applyFilters(): ', () => {
    it('should call action APPLY_FILTERS with parameters', () => {
      const mockedThis = {
        $store: {
          dispatch: jest.fn(),
        },
        tableName,
      };

      const id = { id: 12 };
      const date = { date: '2019.06.01' };

      lazyLoadTable.methods.applyFilters.call(mockedThis, id, date);

      const expectedData = {
        tableName,
        filters: [id, date],
      };
      expect(mockedThis.$store.dispatch).toHaveBeenCalledWith(APPLY_FILTERS, expectedData);
    });
  });
  describe('resetFilters(): ', () => {
    it('should call mutation RESET_FILTERS', () => {
      const mockedThis = {
        $store: {
          commit: jest.fn(),
        },
        tableName,
      };

      lazyLoadTable.methods.resetFilters.call(mockedThis);

      expect(mockedThis.$store.commit).toHaveBeenCalledWith(RESET_FILTERS, tableName);
    });
  });
  describe('onFiltersApplied(): ', () => {
    it('should call applyFilters with params', () => {
      const mockedThis = {
        applyFilters: jest.fn(),
      };

      const filter = { direction: 'desc' };

      lazyLoadTable.methods.onFiltersApplied.call(mockedThis, [filter]);

      expect(mockedThis.applyFilters).toHaveBeenCalledWith(filter);
    });
  });

  describe('computed', () => {
    describe('totalItems', () => {
      it('should return total items', () => {
        const mockedThis = {
          tableName,
          storageData: { total: 7 },
        };

        const result = lazyLoadTable.computed.totalItems.call(mockedThis);

        expect(result).toEqual(7);
      });
    });
    describe('filters', () => {
      it('should return object with filters if filters is not empty', () => {
        const filters = { id: 7 };
        const mockedThis = {
          tableName,
          tableData: { filters },
        };

        const result = lazyLoadTable.computed.filters.call(mockedThis);

        expect(result).toEqual(filters);
      });

      it('should return empty object if filters is empty', () => {
        const mockedThis = {
          tableName,
          tableData: jest.fn(() => ({})),
        };

        const result = lazyLoadTable.computed.filters.call(mockedThis);

        expect(result).toEqual({});
      });
    });
    describe('role', () => {
      it('should return role name', () => {
        const mockedThis = {
          $store: {
            getters: {
              role: 'admin',
            },
          },
        };

        const result = lazyLoadTable.computed.role.call(mockedThis);

        expect(result).toEqual('admin');
      });
    });
    describe('applyingFilters', () => {
      it('should return boolean value', () => {
        const mockedThis = {
          tableData: { applyingFilters: true },
        };

        const result = lazyLoadTable.computed.applyingFilters.call(mockedThis);

        expect(result).toBeTruthy();
      });
    });
    describe('storageData', () => {
      it('should return data', () => {
        const table = 'tableName';
        const mockedThis = {
          tableName: table,
          $store: {
            state: {
              storage: {
                [table]: {
                  id: 1,
                },
              },
            },
          },
        };

        const result = lazyLoadTable.computed.storageData.call(mockedThis);

        expect(result).toEqual({ id: 1 });
      });
    });
    describe('tableData', () => {
      it('should return tableData', () => {
        const data = 'table';
        const mockedThis = {
          tableName,
          $store: {
            state: {
              tables: {
                [data]: {},
              },
            },
          },
        };

        const result = lazyLoadTable.computed.tableData.call(mockedThis);
        const expectedResult = {};

        expect(result).toEqual(expectedResult);
      });
    });
    describe('rows', () => {
      it('should return data', () => {
        const mockedThis = {
          storageData: {
            items: [
              {
                id: 1,
              },
            ],
          },
        };

        const result = lazyLoadTable.computed.rows.call(mockedThis);

        expect(result).toEqual([{ id: 1 }]);
      });
    });
    describe('allItemsLoaded', () => {
      it('should return data', () => {
        const mockedThis = {
          storageData: {
            allItemsLoaded: true,
          },
        };

        const result = lazyLoadTable.computed.allItemsLoaded.call(mockedThis);

        expect(result).toBeTruthy();
      });
    });
    describe('usersDashboardStatistics', () => {
      it('should return data', () => {
        const mockedThis = {
          storageData: {
            usersDashboardStatistics: {
              id: 1,
            },
          },
        };

        const result = lazyLoadTable.computed.usersDashboardStatistics.call(mockedThis);

        expect(result).toEqual({ id: 1 });
      });
    });
  });

  describe('beforeDestroy', () => {
    it('should call resetItems and resetFilters if defined resetDataBeforeLeave as true', () => {
      const mockedThis = {
        resetItems: jest.fn(),
        resetFilters: jest.fn(),
        resetDataBeforeLeave: true,
      };

      lazyLoadTable.beforeDestroy.call(mockedThis);

      expect(mockedThis.resetItems).toHaveBeenCalled();
      expect(mockedThis.resetFilters).toHaveBeenCalled();
    });
  });
  describe('mounted', () => {
    it('should call loadItems if defined initialLoad as true', () => {
      const mockedThis = {
        loadItems: jest.fn(),
      };

      lazyLoadTable.mounted.call(mockedThis);

      expect(mockedThis.loadItems).toHaveBeenCalled();
    });
  });
});
