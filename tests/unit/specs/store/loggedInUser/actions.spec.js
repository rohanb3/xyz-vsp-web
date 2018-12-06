/* eslint-disable import/first */

jest.mock('@/services/auth');

import actions from '@/store/loggedInUser/actions';
import { LOG_IN_USER } from '@/store/loggedInUser/actionTypes';
import { SET_LOGGED_IN_USER } from '@/store/loggedInUser/mutationTypes';
import * as auth from '@/services/auth';

describe('loggedInUser actions: ', () => {
  describe('LOG_IN_USER: ', () => {
    it('should set user if no error', async () => {
      const userName = 'userName';
      const password = 'password';
      const userData = { role: 'Supervisor' };
      const fakeStore = {
        commit: jest.fn(),
      };

      auth.login = jest.fn(() => Promise.resolve(userData));

      await actions[LOG_IN_USER](fakeStore, { userName, password });

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_LOGGED_IN_USER, userData);
      expect(auth.login).toHaveBeenCalledWith(userName, password);
    });
  });
});
