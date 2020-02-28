import * as sinon from 'sinon';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

const _ = require('lodash.debounce');

jest.useFakeTimers();

xdescribe('tableFilterAutocomplete mixin', () => {
  xdescribe('tableFilterAutocomplete computed', () => {
    xdescribe('selectedItems', () => {
      it('should return selectedItems', () => {
        const filterName = 'filter';
        const mockedThis = {
          filterName,
          loading: false,
          [filterName]: [
            { id: 1, name: 'Alabama', value: 'AL', selected: true },
            { id: 2, name: 'Alaska', value: 'AK' },
            { id: 3, name: 'Arizona', value: 'AZ', selected: true },
            { id: 4, name: 'Arkansas', value: 'AR' },
          ],
        };

        const selectedItems = tableFilterAutocomplete.computed.selectedItems.call(mockedThis);

        const expectedSelectedItems = [
          { id: 1, name: 'Alabama', value: 'AL', selected: true },
          { id: 3, name: 'Arizona', value: 'AZ', selected: true },
        ];

        expect(expectedSelectedItems).toEqual(selectedItems);
      });
    });

    xdescribe('tableData', () => {
      it('should return tableData', () => {
        const tableName = 'tableName';
        const mockedThis = {
          tableName,
          $store: {
            state: {
              tables: {
                [tableName]: {
                  name: tableName,
                  items: [
                    { id: 1, name: 'Alabama', value: 'AL', selected: true },
                    { id: 3, name: 'Arizona', value: 'AZ', selected: true },
                  ],
                },
              },
            },
          },
        };

        const tableData = tableFilterAutocomplete.computed.tableData.call(mockedThis);

        const expectedTableData = {
          name: tableName,
          items: [
            { id: 1, name: 'Alabama', value: 'AL', selected: true },
            { id: 3, name: 'Arizona', value: 'AZ', selected: true },
          ],
        };

        expect(expectedTableData).toEqual(tableData);
      });
    });

    xdescribe('filters', () => {
      it('should return filters', () => {
        const tableName = 'tableName';
        const mockedThis = {
          tableData: {
            filters: {
              tableName,
            },
          },
        };

        const filters = tableFilterAutocomplete.computed.filters.call(mockedThis);

        const expectedFilters = {
          tableName: 'tableName',
        };

        expect(expectedFilters).toEqual(filters);
      });
    });

    xdescribe('preselectedItems', () => {
      it('should return preselected items', () => {
        const filterName = 'filterName';
        const mockedThis = {
          filterName,
          filters: {
            [filterName]: ['createOn'],
          },
        };

        const preselectedItems = tableFilterAutocomplete.computed.preselectedItems.call(mockedThis);

        const expectedItems = ['createOn'];

        expect(expectedItems).toEqual(preselectedItems);
      });
    });
  });
  xdescribe('tableFilterAutocomplete methods', () => {
    xdescribe('toggleItem', () => {
      it('should call method selectOneItem and applyFilter', () => {
        const filterName = 'filter';
        const mockedThis = {
          filterName,
          selectOneItem: jest.fn(),
          applyFilter: jest.fn(),
          [filterName]: [
            {
              value: 1,
            },
          ],
          selectedItems: [],
        };

        tableFilterAutocomplete.methods.toggleItem.call(mockedThis, ['value', 1]);

        expect(mockedThis.selectOneItem).toHaveBeenCalled();
        expect(mockedThis.applyFilter).toHaveBeenCalled();
        expect(mockedThis.applyFilter).toHaveBeenCalledWith(mockedThis.selectedItems);
      });
    });
    xdescribe('selectOneItem', () => {
      it('should call $set', () => {
        const filterName = 'filter';
        const mockedThis = {
          $set: jest.fn(),
          filterName,
          [filterName]: [0],
        };

        tableFilterAutocomplete.methods.selectOneItem.call(mockedThis, [0, 'status']);

        expect(mockedThis.$set).toHaveBeenCalled();
      });
    });
    xdescribe('selectAllItem', () => {
      it('should call $set and applyFilters', () => {
        const filterName = 'filter';
        const mockedThis = {
          $set: jest.fn(),
          applyFilter: jest.fn(),
          filterName,
          [filterName]: [
            {
              value: 'value',
            },
          ],
        };

        const itemKeyName = 'value';
        const items = [
          {
            value: 'value',
          },
        ];

        tableFilterAutocomplete.methods.selectAllItem.call(
          mockedThis,
          itemKeyName,
          items,
          'status'
        );

        expect(mockedThis.$set).toHaveBeenCalled();
        expect(mockedThis.applyFilter).toHaveBeenCalled();
      });
    });
    xdescribe('onSelectAllItemDisplayed', () => {
      it('should call selectAllItem with right params', () => {
        const mockedThis = {
          selectAllItem: jest.fn(),
        };
        const itemKeyName = 'value';
        const items = [
          {
            value: 'value',
          },
        ];
        const status = true;

        tableFilterAutocomplete.methods.onSelectAllItemDisplayed.call(mockedThis, {
          itemKeyName,
          items,
        });

        expect(mockedThis.selectAllItem).toHaveBeenCalledWith(itemKeyName, items, status);
      });
    });
    xdescribe('onClearAllItemDisplayed', () => {
      it('should call selectAllItem with right params', () => {
        const mockedThis = {
          selectAllItem: jest.fn(),
        };
        const itemKeyName = 'value';
        const items = [
          {
            value: 'value',
          },
        ];
        const status = false;

        tableFilterAutocomplete.methods.onClearAllItemDisplayed.call(mockedThis, {
          itemKeyName,
          items,
        });

        expect(mockedThis.selectAllItem).toHaveBeenCalledWith(itemKeyName, items, status);
      });
    });
    xdescribe('applyFilter', () => {
      let clock;

      beforeEach(() => {
        clock = sinon.useFakeTimers();
      });

      afterEach(() => {
        clock.restore();
      });

      it('should call callback after 1 seconds', () => {
        const TIMEOUT_APPLY_FILTER = 1000;

        const func = jest.fn();
        const debouncedFunc = _(func, TIMEOUT_APPLY_FILTER);

        debouncedFunc();
        expect(func).toHaveBeenCalledTimes(0);

        clock.tick(1000);
        expect(func).toHaveBeenCalledTimes(1);
      });
    });
    xdescribe('displayPreselectItems', () => {
      it('should call toggleItem method', () => {
        const mockedThis = {
          preselectedItems: [
            {
              id: 1,
            },
          ],
          toggleItem: jest.fn(),
        };

        tableFilterAutocomplete.methods.displayPreselectItems.call(mockedThis, {
          itemKeyName: 'id',
        });

        expect(mockedThis.toggleItem).toHaveBeenCalled();
      });
    });
    xdescribe('onNotFoundItem', () => {
      it('should call getItemList with right params', () => {
        const mockedThis = {
          loading: false,
          $set: jest.fn(),
        };
        const getItemList = jest.fn(() => Promise.resolve());
        const itemKey = 'itemKey';
        const searchField = 'searchField';

        tableFilterAutocomplete.methods.onNotFoundItem.call(mockedThis, {
          itemKey,
          searchField,
          getItemList,
        });

        expect(getItemList).toHaveBeenCalledWith(searchField);
      });
    });
    xdescribe('loadingPreselectedItems', () => {
      it('should call getItemById', async () => {
        const displayedFieldName = 'displayedFieldName';
        const itemKeyName = 'id';
        const data = { data: { displayedFieldName, itemKeyName } };
        const filterName = 'filter';
        const getItemById = await jest.fn(() => data);

        const mockedThis = {
          filterName,
          preselectedItems: [1],
          [filterName]: [
            {
              id: 2,
            },
          ],
          toggleItem: jest.fn(),
        };

        await tableFilterAutocomplete.methods.loadingPreselectedItems.call(mockedThis, {
          itemKeyName,
          displayedFieldName,
          getItemById,
        });

        expect(getItemById).toHaveBeenCalled();
        expect(mockedThis.toggleItem).not.toHaveBeenCalled();
      });

      it('should call toggleItem', async () => {
        const displayedFieldName = 'displayedFieldName';
        const itemKeyName = 'id';
        const data = { data: { displayedFieldName, itemKeyName } };
        const filterName = 'filter';
        const getItemById = await jest.fn(() => data);

        const mockedThis = {
          filterName,
          preselectedItems: [1],
          [filterName]: [
            {
              id: 1,
            },
          ],
          toggleItem: jest.fn(),
        };

        await tableFilterAutocomplete.methods.loadingPreselectedItems.call(mockedThis, {
          itemKeyName,
          displayedFieldName,
          getItemById,
        });

        expect(getItemById).not.toHaveBeenCalled();
        expect(mockedThis.toggleItem).toHaveBeenCalled();
      });
    });
  });
});
