/* eslint-disable import/first */

jest.mock('@/services/repository');

import actions from '@/store/storage/actions';
import {
  LOAD_CUSTOMERS,
  LOAD_ALL_CUSTOMERS_LENGTH,
  LOAD_CALLS,
  LOAD_ALL_CALLS_LENGTH,
} from '@/store/storage/actionTypes';
import {
  INSERT_CUSTOMERS,
  SET_ALL_CUSTOMERS_LENGTH,
  INSERT_CALLS,
  SET_ALL_CALLS_LENGTH,
} from '@/store/storage/mutationTypes';
import * as repository from '@/services/repository';

describe('storage actions: ', () => {
  describe('LOAD_CUSTOMERS: ', () => {
    it('should load customers', async () => {
      const customers = [{ id: 123 }, { id: 321 }];
      const fakeStore = {
        commit: jest.fn(),
        getters: {
          loadedCustomersAmount: 10,
        },
        state: {
          customersToLoad: 5,
        },
      };

      repository.getCustomers = jest.fn(() => Promise.resolve(customers));

      await actions[LOAD_CUSTOMERS](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_CUSTOMERS, customers);
      expect(repository.getCustomers).toHaveBeenCalledWith(10, 5);
    });
  });

  describe('LOAD_ALL_CUSTOMERS_LENGTH: ', () => {
    it('should load all customers length', async () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      repository.getAllCustomersLength = jest.fn(() => Promise.resolve(42));

      await actions[LOAD_ALL_CUSTOMERS_LENGTH](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_CUSTOMERS_LENGTH, 42);
    });
  });

  describe('LOAD_CALLS: ', () => {
    it('should load calls', async () => {
      const calls = [{ id: 123 }, { id: 321 }];
      const fakeStore = {
        commit: jest.fn(),
        getters: {
          loadedCallsAmount: 10,
        },
        state: {
          callsToLoad: 5,
        },
      };

      repository.getCalls = jest.fn(() => Promise.resolve(calls));

      await actions[LOAD_CALLS](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_CALLS, calls);
      expect(repository.getCustomers).toHaveBeenCalledWith(10, 5);
    });
  });

  describe('LOAD_ALL_CALLS_LENGTH: ', () => {
    it('should load all calls length', async () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      repository.getAllCallsLength = jest.fn(() => Promise.resolve(42));

      await actions[LOAD_ALL_CALLS_LENGTH](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_CALLS_LENGTH, 42);
    });
  });
});
