import mutations from '@/store/storage/mutations';
import {
  INSERT_CUSTOMERS,
  SET_ALL_CUSTOMERS_LENGTH,
  INSERT_CALLS,
  SET_ALL_CALLS_LENGTH,
} from '@/store/storage/mutationTypes';

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
    it('should set llength', () => {
      const state = {
        allCustomersLength: 0,
      };

      mutations[SET_ALL_CUSTOMERS_LENGTH](state, 4);

      expect(state.allCustomersLength).toBe(4);
    });
  });

  describe('INSERT_CALLS: ', () => {
    it('should insert calls', () => {
      const state = {
        calls: [{ id: 123 }],
      };

      const expectedCalls = [{ id: 123 }, { id: 321 }];

      mutations[INSERT_CALLS](state, [{ id: 321 }]);

      expect(state.calls).toEqual(expectedCalls);
    });
  });

  describe('SET_ALL_CALLS_LENGTH: ', () => {
    it('should set length', () => {
      const state = {
        allCallsLength: 0,
      };

      mutations[SET_ALL_CALLS_LENGTH](state, 4);

      expect(state.allCallsLength).toBe(4);
    });
  });
});
