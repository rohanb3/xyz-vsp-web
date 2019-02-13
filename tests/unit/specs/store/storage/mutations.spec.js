import mutations from '@/store/storage/mutations';
import {
  INSERT_CUSTOMERS,
  SET_ALL_CUSTOMERS_LENGTH,
  INSERT_SUPERADMIN_COMPANIES,
  SET_ALL_SUPERADMIN_COMPANIES_LENGTH,
  INSERT_SUPERADMIN_OPERATORS,
  SET_ALL_SUPERADMIN_OPERATORS_LENGTH,
  INSERT_CALLS,
  SET_ALL_CALLS_LENGTH,
  INSERT_PAYMENTS,
  SET_ALL_PAYMENTS_LENGTH,
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

  describe('INSERT_SUPERADMIN_COMPANIES: ', () => {
    it('should insert companies', () => {
      const state = {
        superadminCompanies: [{ id: 123 }],
      };

      const expectedCompanies = [{ id: 123 }, { id: 321 }];

      mutations[INSERT_SUPERADMIN_COMPANIES](state, [{ id: 321 }]);

      expect(state.superadminCompanies).toEqual(expectedCompanies);
    });
  });

  describe('SET_ALL_SUPERADMIN_COMPANIES_LENGTH: ', () => {
    it('should set length', () => {
      const state = {
        allSuperadminCompaniesLength: 0,
      };

      mutations[SET_ALL_SUPERADMIN_COMPANIES_LENGTH](state, 4);

      expect(state.allSuperadminCompaniesLength).toBe(4);
    });
  });

  describe('INSERT_SUPERADMIN_OPERATORS: ', () => {
    it('should insert operators', () => {
      const state = {
        superadminOperators: [{ id: 123 }],
      };

      const expectedOperators = [{ id: 123 }, { id: 321 }];

      mutations[INSERT_SUPERADMIN_OPERATORS](state, [{ id: 321 }]);

      expect(state.superadminOperators).toEqual(expectedOperators);
    });
  });

  describe('SET_ALL_SUPERADMIN_OPERATORS_LENGTH: ', () => {
    it('should set length', () => {
      const state = {
        allSuperadminOperatorsLength: 0,
      };

      mutations[SET_ALL_SUPERADMIN_OPERATORS_LENGTH](state, 4);

      expect(state.allSuperadminOperatorsLength).toBe(4);
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

  describe('INSERT_PAYMENTS: ', () => {
    it('should insert payments', () => {
      const state = {
        payments: [{ date: '2019-01-15T12:00:00' }],
      };

      const expectedPayments = [{ date: '2019-01-15T12:00:00' }, { date: '2019-01-17T12:00:00' }];

      mutations[INSERT_PAYMENTS](state, [{ date: '2019-01-17T12:00:00' }]);

      expect(state.payments).toEqual(expectedPayments);
    });
  });

  describe('SET_ALL_PAYMENTS_LENGTH: ', () => {
    it('should set length', () => {
      const state = {
        allPaymentsLength: 0,
      };

      mutations[SET_ALL_PAYMENTS_LENGTH](state, 5);

      expect(state.allPaymentsLength).toBe(5);
    });
  });
});
