import actions from '@/store/loggedInUser/actions';
import { LOGIN, REFRESH_TOKEN, GET_PROFILE_DATA } from '@/store/loggedInUser/actionTypes';
import { SET_TOKEN, SET_PROFILE_DATA } from '@/store/loggedInUser/mutationTypes';
import * as identityRepository from '@/services/identityRepository';

describe('loggedInUser actions: ', () => {
  describe('GET_PROFILE_DATA: ', () => {
    it('should load profile', async () => {
      const fakeStore = {
        commit: jest.fn(),
        state: {},
      };

      const result = {
        email: 'salesrep@test.com',
        givenName: 'Dima',
        surname: 'Mortyk',
        companyId: 7929,
        avatarUrl: null,
      };

      identityRepository.getProfileData = jest.fn(() => Promise.resolve(result));

      await actions[GET_PROFILE_DATA](fakeStore);

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_PROFILE_DATA, result);
      expect(identityRepository.getProfileData).toHaveBeenCalled();
    });
  });
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

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_TOKEN, {
        accessToken,
        refreshToken,
      });
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

      expect(fakeStore.commit).toHaveBeenCalledWith(SET_TOKEN, {
        accessToken,
        refreshToken,
      });
      expect(identityRepository.refreshToken).toHaveBeenCalled();
    });
  });
});
