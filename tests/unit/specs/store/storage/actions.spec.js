/* eslint-disable import/first */

jest.mock('@/store/storage/repositoryHelper');

import actions from '@/store/storage/actions';
import {
  LOAD_ITEMS,
  LOAD_MORE_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '@/store/storage/actionTypes';

import {
  INSERT_ITEMS,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  CHANGE_ITEM,
  REMOVE_ITEM,
} from '@/store/storage/mutationTypes';

import * as repositoryHelper from '@/store/storage/repositoryHelper';

const itemType = 'SOME_TYPE';

xdescribe('storage actions: ', () => {
  xdescribe('LOAD_ITEMS: ', () => {
    it('should load items', async () => {
      let result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      result = result.concat(result).concat(result);
      const fakeStore = {
        commit: jest.fn(),
        state: {
          [itemType]: {
            itemsToLoad: 2,
            items: [1, 2],
          },
        },
      };
      const expectedFilters = {
        offset: 0,
        limit: 50,
      };

      const getAll = jest.fn(() => Promise.resolve({ data: [...result], total: result.length }));
      repositoryHelper.getEntityActions = jest.fn(() => ({ getAll }));

      await actions[LOAD_ITEMS](fakeStore, { itemType });

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_ITEMS, {
        itemType,
        items: result,
      });
      expect(fakeStore.commit).toHaveBeenCalledWith(RESET_ITEMS, itemType);
      expect(fakeStore.commit).not.toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
      expect(getAll).toHaveBeenCalledWith(expectedFilters);
    });

    it('should set allItemsLoaded to true if got less items than could', async () => {
      let result = [1, 2];
      result = result.concat(result).concat(result);
      const fakeStore = {
        commit: jest.fn(),
        state: {
          [itemType]: {
            itemsToLoad: 2,
            items: [1, 2],
          },
        },
      };

      const getAll = jest.fn(() => Promise.resolve({ data: [...result], total: result.length }));
      repositoryHelper.getEntityActions = jest.fn(() => ({ getAll }));

      await actions[LOAD_ITEMS](fakeStore, { itemType });
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
    });
  });

  xdescribe('LOAD_MORE_ITEMS: ', () => {
    it('should load more items', async () => {
      let result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      result = result.concat(result).concat(result);
      const fakeStore = {
        commit: jest.fn(),
        state: {
          [itemType]: {
            itemsToLoad: 2,
            items: [1, 2],
          },
        },
      };
      const expectedFilters = {
        offset: 2,
        limit: 50,
      };

      const getAll = jest.fn(() => Promise.resolve({ data: [...result], total: result.length }));
      repositoryHelper.getEntityActions = jest.fn(() => ({ getAll }));

      await actions[LOAD_MORE_ITEMS](fakeStore, { itemType });

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_ITEMS, {
        itemType,
        items: result,
      });
      expect(fakeStore.commit).not.toHaveBeenCalledWith(RESET_ITEMS, itemType);
      expect(fakeStore.commit).not.toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
      expect(getAll).toHaveBeenCalledWith(expectedFilters);
    });

    it('should set allItemsLoaded to true if got less items than could', async () => {
      let result = [1, 2];
      result = result.concat(result).concat(result);
      const fakeStore = {
        commit: jest.fn(),
        state: {
          [itemType]: {
            itemsToLoad: 2,
            items: [1, 2],
          },
        },
      };

      const getAll = jest.fn(() => Promise.resolve({ data: [...result], total: result.length }));
      repositoryHelper.getEntityActions = jest.fn(() => ({ getAll }));

      await actions[LOAD_MORE_ITEMS](fakeStore, { itemType });
      expect(fakeStore.commit).not.toHaveBeenCalledWith(RESET_ITEMS, itemType);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_ITEMS_LOADED, itemType);
    });
  });

  xdescribe('CREATE_ITEM: ', () => {
    it('should create item', async () => {
      const item = { id: 123, _new: true };
      const fakeStore = {
        commit: jest.fn(),
      };

      const create = jest.fn(() => Promise.resolve(item));
      repositoryHelper.getEntityActions = jest.fn(() => ({ create }));

      await actions[CREATE_ITEM](fakeStore, { itemType, data: item });

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_ITEMS, {
        itemType,
        items: [item],
      });
    });
  });

  xdescribe('UPDATE_ITEM: ', () => {
    it('should update item', async () => {
      const item = { id: 1, title: 'Foxtrot' };
      const fakeStore = {
        commit: jest.fn(),
      };

      const update = jest.fn(() => Promise.resolve(item));
      repositoryHelper.getEntityActions = jest.fn(() => ({ update }));

      await actions[UPDATE_ITEM](fakeStore, item);

      expect(fakeStore.commit).toHaveBeenCalledWith(CHANGE_ITEM, item);
    });
  });

  xdescribe('DELETE_ITEM: ', () => {
    it('should delete item', async () => {
      const id = 2;

      const fakeStore = {
        commit: jest.fn(),
      };

      const deleteItem = jest.fn(() => Promise.resolve());
      repositoryHelper.getEntityActions = jest.fn(() => ({
        delete: deleteItem,
      }));

      await actions[DELETE_ITEM](fakeStore, { itemType, id });

      expect(deleteItem).toHaveBeenCalledWith(id);
      expect(fakeStore.commit).toHaveBeenCalledWith(REMOVE_ITEM, {
        itemType,
        id,
      });
    });
  });
});
