/* eslint-disable import/first */

jest.mock('@/services/repository');

import actions from '@/store/storage/actions';
import {
  LOAD_CUSTOMERS,
  LOAD_ALL_CUSTOMERS_LENGTH,
  LOAD_SUPERADMIN_COMPANIES,
  LOAD_SUPERADMIN_COMPANIES_LENGTH,
  LOAD_CALLS,
  LOAD_ALL_CALLS_LENGTH,
  LOAD_CALLS_DURATION,
  LOAD_CALLS_FEEDBACK,
  LOAD_SUPERADMIN_OPERATORS,
  LOAD_ALL_SUPERADMIN_OPERATORS_LENGTH,
  LOAD_PAYMENTS,
  LOAD_ALL_PAYMENTS_LENGTH,
} from '@/store/storage/actionTypes';
import {
  INSERT_CUSTOMERS,
  SET_ALL_CUSTOMERS_LENGTH,
  INSERT_SUPERADMIN_COMPANIES,
  SET_ALL_SUPERADMIN_COMPANIES_LENGTH,
  INSERT_CALLS,
  SET_ALL_CALLS_LENGTH,
  INSERT_CALLS_DURATION,
  INSERT_CALLS_FEEDBACK,
  INSERT_SUPERADMIN_OPERATORS,
  SET_ALL_SUPERADMIN_OPERATORS_LENGTH,
  INSERT_PAYMENTS,
  SET_ALL_PAYMENTS_LENGTH,
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
      };

      repository.getCustomers = jest.fn(() => Promise.resolve(customers));

      await actions[LOAD_CUSTOMERS](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_CUSTOMERS, customers);
      expect(repository.getCustomers).toHaveBeenCalledWith(10, 20);
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

  describe('LOAD_SUPERADMIN_COMPANIES: ', () => {
    it('should load companies', async () => {
      const companies = [{ id: 123 }, { id: 321 }];
      const fakeStore = {
        commit: jest.fn(),
        getters: {
          loadedSuperadminCompaniesAmount: 10,
        },
      };

      repository.getSuperadminCompanies = jest.fn(() => Promise.resolve(companies));

      await actions[LOAD_SUPERADMIN_COMPANIES](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_SUPERADMIN_COMPANIES, companies);
      expect(repository.getSuperadminCompanies).toHaveBeenCalledWith(10, 20);
    });
  });

  describe('LOAD_SUPERADMIN_COMPANIES_LENGTH: ', () => {
    it('should load all companies length', async () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      repository.getAllSuperadminCompaniesLength = jest.fn(() => Promise.resolve(42));

      await actions[LOAD_SUPERADMIN_COMPANIES_LENGTH](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_SUPERADMIN_COMPANIES_LENGTH, 42);
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
      };

      repository.getCalls = jest.fn(() => Promise.resolve(calls));

      await actions[LOAD_CALLS](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_CALLS, calls);
      expect(repository.getCustomers).toHaveBeenCalledWith(10, 20);
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
  describe('LOAD_CALLS_DURATION: ', () => {
    it('should load calls duration', async () => {
      const callsDuration = [{ type: 'help', total: 23 }, { type: 'info', total: 1 }];
      const fakeStore = {
        commit: jest.fn(),
      };

      repository.getCallsDuration = jest.fn(() => Promise.resolve(callsDuration));

      await actions[LOAD_CALLS_DURATION](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_CALLS_DURATION, callsDuration);
    });
  });
  describe('LOAD_CALLS_FEEDBACK: ', () => {
    it('should load calls feedback', async () => {
      const callsFeedback = [{ type: 'help', total: 23 }, { type: 'info', total: 1 }];
      const fakeStore = {
        commit: jest.fn(),
      };

      repository.getCallsFeedback = jest.fn(() => Promise.resolve(callsFeedback));

      await actions[LOAD_CALLS_FEEDBACK](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_CALLS_FEEDBACK, callsFeedback);
    });
  });
  describe('LOAD_SUPERADMIN_OPERATORS: ', () => {
    it('should load operators', async () => {
      const operators = [{ id: 123 }, { id: 321 }];
      const fakeStore = {
        commit: jest.fn(),
        getters: {
          loadedSuperadminOperatorsAmount: 10,
        },
      };

      repository.getSuperadminOperators = jest.fn(() => Promise.resolve(operators));

      await actions[LOAD_SUPERADMIN_OPERATORS](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_SUPERADMIN_OPERATORS, operators);
      expect(repository.getSuperadminOperators).toHaveBeenCalledWith(10, 20);
    });
  });

  describe('LOAD_SUPERADMIN_OPERATORS_LENGTH: ', () => {
    it('should load all operators length', async () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      repository.getAllSuperadminOperatorsLength = jest.fn(() => Promise.resolve(42));

      await actions[LOAD_ALL_SUPERADMIN_OPERATORS_LENGTH](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_SUPERADMIN_OPERATORS_LENGTH, 42);
    });
  });
  describe('LOAD_PAYMENTS: ', () => {
    it('should load payments', async () => {
      const payments = [{ date: '2019-01-15T12:00:00' }, { date: '2019-01-17T12:00:00' }];
      const fakeStore = {
        commit: jest.fn(),
        getters: {
          loadedPaymentsAmount: 10,
        },
      };

      repository.getPayments = jest.fn(() => Promise.resolve(payments));

      await actions[LOAD_PAYMENTS](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_PAYMENTS, payments);
      expect(repository.getPayments).toHaveBeenCalledWith(10, 20);
    });
  });

  describe('LOAD_ALL_PAYMENTS_LENGTH: ', () => {
    it('should load all payments length', async () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      repository.getAllPaymentsLength = jest.fn(() => Promise.resolve(30));

      await actions[LOAD_ALL_PAYMENTS_LENGTH](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_ALL_PAYMENTS_LENGTH, 30);
    });
  });
});
