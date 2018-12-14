import mutations from '@/store/storage/mutations';
import { INSERT_CUSTOMERS, SET_ALL_CUSTOMERS_LENGTH } from '@/store/storage/mutationTypes';

describe('storage mutations: ', () => {
  describe('INSERT_CUSTOMERS: ', () => {
    it('should insert customers', () => {
      const state = {
        customers: [{ id: 123 }],
      };

      const expectedCustomers = [{ id: 123 }, { id: 321 }];

      mutations[INSERT_CUSTOMERS](state, [{ id: 321 }]);

      expect(state.customers).toEqual(expectedCustomers);
    });
  });

  describe('SET_ALL_CUSTOMERS_LENGTH: ', () => {
    it('should set logged in user', () => {
      const state = {
        allCustomersLength: 0,
      };

      mutations[SET_ALL_CUSTOMERS_LENGTH](state, 4);

      expect(state.allCustomersLength).toBe(4);
    });
  });
});
