/* eslint-disable import/first */

jest.mock('@/store/storage/repositoryHelper');

import actions from '@/store/storage/actions';
import {
  LOAD_ITEMS,
  LOAD_MORE_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  LOAD_FULL_DEVICES_LIST,
  LOAD_TENANT_MINIFIED_USERS,
  LOAD_TENANT_MINIFIED_COMPANIES,
} from '@/store/storage/actionTypes';

import {
  INSERT_ITEMS,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  CHANGE_ITEM,
  REMOVE_ITEM,
  SET_FULL_DEVICES_LIST,
  SET_TENANT_MINIFIED_USERS,
  SET_TENANT_MINIFIED_COMPANIES,
} from '@/store/storage/mutationTypes';

import * as repositoryHelper from '@/store/storage/repositoryHelper';
import * as devicesRepository from '@/services/devicesRepository';
import * as identityRepository from '@/services/identityRepository';
import * as publicApiRepository from '@/services/publicApiRepository';

const itemType = 'SOME_TYPE';

describe('storage actions: ', () => {
  describe('LOAD_ITEMS: ', () => {
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

  describe('LOAD_MORE_ITEMS: ', () => {
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

  describe('CREATE_ITEM: ', () => {
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

  describe('UPDATE_ITEM: ', () => {
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

  describe('DELETE_ITEM: ', () => {
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

  describe('LOAD_FULL_DEVICES_LIST', () => {
    it('should load all devices list', async () => {
      const fakeStore = {
        commit: jest.fn(),
        getters: {
          allDevices: {},
        },
      };
      const devices = [
        { id: 1, udid: 1, deviceName: '1' },
        { id: 2, udid: 2, deviceName: '2' },
        { id: 3, udid: 3, deviceName: '3' },
      ];
      const data = { data: devices };

      devicesRepository.getDevices = jest.fn(() => Promise.resolve(data));

      const actual = await actions[LOAD_FULL_DEVICES_LIST](fakeStore);

      expect(devicesRepository.getDevices).toHaveBeenCalled();
      expect(actual).toBe(devices);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_FULL_DEVICES_LIST, devices);
    });
    it("should return existed value without API request if it's already in store ", async () => {
      const allDevices = {
        1: { id: 1, udid: 1, deviceName: '1' },
        2: { id: 2, udid: 2, deviceName: '2' },
        3: { id: 3, udid: 3, deviceName: '3' },
      };

      const fakeStore = {
        commit: jest.fn(),
        getters: {
          allDevices,
        },
      };

      devicesRepository.getDevices = jest.fn();

      const actual = await actions[LOAD_FULL_DEVICES_LIST](fakeStore);

      expect(devicesRepository.getDevices).not.toHaveBeenCalled();
      expect(actual).toBe(allDevices);
      expect(fakeStore.commit).not.toHaveBeenCalled();
    });
  });
  describe('LOAD_TENANT_MINIFIED_USERS', () => {
    it('should load all minified users by tenant', async () => {
      const fakeStore = {
        commit: jest.fn(),
        getters: {
          tenantUsers: {},
        },
      };
      const users = [
        { id: 1, users: [{ objectId: 1, userName: '1' }] },
        { id: 2, users: [{ objectId: 2, userName: '2' }] },
        { id: 3, users: [{ objectId: 3, userName: '3' }] },
        { id: 4, users: [{ objectId: 4, userName: '4' }] },
      ];

      identityRepository.getMinifiedUsersByTenants = jest.fn(() => Promise.resolve(users));

      const actual = await actions[LOAD_TENANT_MINIFIED_USERS](fakeStore);

      expect(identityRepository.getMinifiedUsersByTenants).toHaveBeenCalled();
      expect(actual).toBe(users);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_TENANT_MINIFIED_USERS, users);
    });
    it("should return existed value without API request if it's already in store ", async () => {
      const tenantUsers = {
        1: { id: 1, users: [{ objectId: 1, userName: '1' }] },
        2: { id: 2, users: [{ objectId: 2, userName: '2' }] },
        3: { id: 3, users: [{ objectId: 3, userName: '3' }] },
        4: { id: 4, users: [{ objectId: 4, userName: '4' }] },
      };

      const fakeStore = {
        commit: jest.fn(),
        getters: {
          tenantUsers,
        },
      };

      identityRepository.getMinifiedUsersByTenants = jest.fn();

      const actual = await actions[LOAD_TENANT_MINIFIED_USERS](fakeStore);

      expect(identityRepository.getMinifiedUsersByTenants).not.toHaveBeenCalled();
      expect(actual).toBe(tenantUsers);
      expect(fakeStore.commit).not.toHaveBeenCalled();
    });
  });
  describe('LOAD_TENANT_MINIFIED_COMPANIES', () => {
    it('should load all minified users by tenant', async () => {
      const fakeStore = {
        commit: jest.fn(),
        getters: {
          tenantCompanies: {},
        },
      };
      const companies = [
        { id: 1, companies: [{ id: 1, companyName: '1' }] },
        { id: 2, companies: [{ id: 2, companyName: '2' }] },
        { id: 3, companies: [{ id: 3, companyName: '3' }] },
        { id: 4, companies: [{ id: 4, companyName: '4' }] },
      ];

      publicApiRepository.getMinifiedCompaniesByTenants = jest.fn(() => Promise.resolve(companies));

      const actual = await actions[LOAD_TENANT_MINIFIED_COMPANIES](fakeStore);

      expect(publicApiRepository.getMinifiedCompaniesByTenants).toHaveBeenCalled();
      expect(actual).toBe(companies);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_TENANT_MINIFIED_COMPANIES, companies);
    });
    it("should return existed value without API request if it's already in store ", async () => {
      const tenantCompanies = {
        1: { id: 1, companies: [{ id: 1, companyName: '1' }] },
        2: { id: 2, companies: [{ id: 2, companyName: '2' }] },
        3: { id: 3, companies: [{ id: 3, companyName: '3' }] },
        4: { id: 4, companies: [{ id: 4, companyName: '4' }] },
      };

      const fakeStore = {
        commit: jest.fn(),
        getters: {
          tenantCompanies,
        },
      };

      publicApiRepository.getMinifiedCompaniesByTenants = jest.fn();

      const actual = await actions[LOAD_TENANT_MINIFIED_COMPANIES](fakeStore);

      expect(publicApiRepository.getMinifiedCompaniesByTenants).not.toHaveBeenCalled();
      expect(actual).toBe(tenantCompanies);
      expect(fakeStore.commit).not.toHaveBeenCalled();
    });
  });
});
