import filterAutocomplete from '@/mixins/filterAutocomplete';

xdescribe('filterAutocomplete mixin', () => {
  xdescribe('computed:', () => {
    xdescribe('selectedItems', () => {
      it('should return selected items', () => {
        const filterName = 'NAME';
        const mockedThis = {
          filterName,
          [filterName]: [
            {
              selected: true,
              id: 1,
            },
            {
              selected: false,
              id: 2,
            },
          ],
        };

        const expectedResult = [
          {
            selected: true,
            id: 1,
          },
        ];

        const selectedItems = filterAutocomplete.computed.selectedItems.call(mockedThis);

        expect(selectedItems).toEqual(expectedResult);
      });
    });
    xdescribe('tableData', () => {
      it('should return data', () => {
        const tableName = 'tableName';
        const mockedThis = {
          tableName,
          $store: {
            state: {
              tables: {
                [tableName]: {
                  id: 1,
                  name: tableName,
                },
              },
            },
          },
        };

        const expectedResult = {
          id: 1,
          name: tableName,
        };

        const result = filterAutocomplete.computed.tableData.call(mockedThis);

        expect(result).toEqual(expectedResult);
      });
    });
    xdescribe('filters', () => {
      it('should return filters', () => {
        const mockedThis = {
          tableData: {
            filters: {
              direction: 'desc',
            },
          },
        };

        const result = filterAutocomplete.computed.filters.call(mockedThis);
        const expectedResult = {
          direction: 'desc',
        };

        expect(result).toEqual(expectedResult);
      });
    });
    xdescribe('preselectedItems', () => {
      it('should return preselectedItems', () => {
        const filterName = 'filterName';
        const mockedThis = {
          filterName,
          filters: {
            [filterName]: [
              {
                id: 1,
              },
            ],
          },
        };

        const expectedResult = [
          {
            id: 1,
          },
        ];

        const result = filterAutocomplete.computed.preselectedItems.call(mockedThis);

        expect(result).toEqual(expectedResult);
      });
    });
  });
  xdescribe('filterAutocomplete methods', () => {
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

        filterAutocomplete.methods.toggleItem.call(mockedThis, ['value', 1]);

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

        filterAutocomplete.methods.selectOneItem.call(mockedThis, [0, 'status']);

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

        filterAutocomplete.methods.selectAllItem.call(mockedThis, itemKeyName, items, 'status');

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

        filterAutocomplete.methods.onSelectAllItemDisplayed.call(mockedThis, {
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

        filterAutocomplete.methods.onClearAllItemDisplayed.call(mockedThis, {
          itemKeyName,
          items,
        });

        expect(mockedThis.selectAllItem).toHaveBeenCalledWith(itemKeyName, items, status);
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

        filterAutocomplete.methods.displayPreselectItems.call(mockedThis, {
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

        filterAutocomplete.methods.onNotFoundItem.call(mockedThis, {
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

        await filterAutocomplete.methods.loadingPreselectedItems.call(mockedThis, {
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

        await filterAutocomplete.methods.loadingPreselectedItems.call(mockedThis, {
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
