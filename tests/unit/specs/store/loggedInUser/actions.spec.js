import actions from '@/store/loggedInUser/actions';
import { LOGIN, REFRESH_TOKEN } from '@/store/loggedInUser/actionTypes';
import { SET_TOKEN } from '@/store/loggedInUser/mutationTypes';
import * as identityRepository from '@/services/identityRepository';

describe('loggedInUser actions: ', () => {
  describe('LOGIN: ', () => {
    it('should get token according to email and login', async () => {
      const fakeStore = {
        commit: jest.fn(),
        state: {},
      };
      const userData = {
        email: 'test@test.com',
        password: '123',
      };

      const response = {
        data: {
          access_token: '123',
          refresh_token: '456',
        },
      };
      const { access_token: accessToken, refresh_token: refreshToken } = response.data;
      identityRepository.login = jest.fn(() => Promise.resolve(response));

      await actions[LOGIN](fakeStore, userData);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_TOKEN, { accessToken, refreshToken });
      expect(identityRepository.login).toHaveBeenCalled();
    });
  });
  describe('REFRESH_TOKEN: ', () => {
    it('should get new token instead of expired one', async () => {
      const fakeStore = {
        commit: jest.fn(),
        state: {
          token: {
            refreshToken: '123',
          },
        },
      };

      const response = {
        data: {
          access_token: '123',
          refresh_token: '456',
        },
      };
      const { access_token: accessToken, refresh_token: refreshToken } = response.data;
      identityRepository.refreshToken = jest.fn(() => Promise.resolve(response));

      await actions[REFRESH_TOKEN](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_TOKEN, { accessToken, refreshToken });
      expect(identityRepository.refreshToken).toHaveBeenCalled();
    });
  });
});
