/* eslint-disable import/first */

jest.mock('@/services/identityRepository');
jest.mock('@/services/branchesRepository');
jest.mock('@/services/sentry');
jest.mock('@/services/twilio');

import * as identityRepository from '@/services/identityRepository';
import * as branchesRepository from '@/services/branchesRepository';
import actions from '@/store/call/actions';
import { GET_CALL_CUSTOMER_DATA } from '@/store/call/actionTypes';
import { SET_CALL_DATA } from '@/store/call/mutationTypes';

describe('call actions: ', () => {
  describe('GET_CALL_CUSTOMER_DATA', () => {
    it('should set customer data and branch data', async () => {
      const customerId = 'customer42';
      const branchId = 'branch42';
      const customer = {
        id: customerId,
        branchId,
      };
      const branch = {
        companyName: 'company42',
      };
      const fakeStore = {
        commit: jest.fn(),
      };

      identityRepository.getUser = jest.fn(() => Promise.resolve(customer));
      branchesRepository.getBranchInfo = jest.fn(() => Promise.resolve(branch));

      await actions[GET_CALL_CUSTOMER_DATA](fakeStore, customerId);

      expect(identityRepository.getUser).toHaveBeenCalledWith(customerId);
      expect(branchesRepository.getBranchInfo).toHaveBeenCalledWith(branchId);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_CALL_DATA, {
        customer,
      });
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_CALL_DATA, { branch });
    });

    it('should set only customer data if branch request failed', async () => {
      const customerId = 'customer42';
      const branchId = 'branch42';
      const customer = {
        id: customerId,
        branchId,
      };
      const fakeStore = {
        commit: jest.fn(),
      };

      identityRepository.getUser = jest.fn(() => Promise.resolve(customer));
      branchesRepository.getBranchInfo = jest.fn(() => Promise.reject());

      await actions[GET_CALL_CUSTOMER_DATA](fakeStore, customerId);

      expect(identityRepository.getUser).toHaveBeenCalledWith(customerId);
      expect(branchesRepository.getBranchInfo).toHaveBeenCalledWith(branchId);

      expect(fakeStore.commit).toHaveBeenCalledTimes(1);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_CALL_DATA, {
        customer,
      });
    });

    it('should set nothing if both requests failed', async () => {
      const customerId = 'customer42';
      const fakeStore = {
        commit: jest.fn(),
      };

      identityRepository.getUser = jest.fn(() => Promise.reject());
      branchesRepository.getBranchInfo = jest.fn(() => Promise.reject());

      await actions[GET_CALL_CUSTOMER_DATA](fakeStore, customerId);

      expect(identityRepository.getUser).toHaveBeenCalledWith(customerId);
      expect(branchesRepository.getBranchInfo).not.toHaveBeenCalled();

      expect(fakeStore.commit).not.toHaveBeenCalled();
    });
  });
});
