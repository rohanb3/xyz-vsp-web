/* eslint-disable import/first */

jest.mock('@/services/repository');

import actions from '@/store/storage/actions';
import { LOAD_CUSTOMERS, LOAD_ALL_CUSTOMERS_LENGTH } from '@/store/storage/actionTypes';
import { INSERT_CUSTOMERS, SET_ALL_CUSTOMERS_LENGTH } from '@/store/storage/mutationTypes';
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
});
