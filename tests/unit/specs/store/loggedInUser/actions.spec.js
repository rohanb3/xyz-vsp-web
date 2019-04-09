import actions from '@/store/loggedInUser/actions';
import {
  LOGIN,
  REFRESH_TOKEN,
  GET_PROFILE_DATA,
  GET_PHOTO,
} from '@/store/loggedInUser/actionTypes';
import { SET_TOKEN, SET_PROFILE_DATA } from '@/store/loggedInUser/mutationTypes';
import * as identityRepository from '@/services/identityRepository';
import {
  STATUS_NO_CONTENT,
  STATUS_OK,
  STATUS_INTERNAL_SERVER_ERROR,
} from '@/constants/responseStatuses';

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
        avatarLink: null,
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

  describe('GET_PHOTO: ', () => {
    it('should get url photo', async () => {
      const objectId = '23gh234jhhwej';
      const avatarBase64Url = 'data:image/jpeg;base64,iVBORw0KGg...';

      const fakeStore = {
        commit: jest.fn(),
        state: {
          profileData: {
            objectId,
            avatarLink: null,
          },
        },
      };

      identityRepository.getAvatar = jest.fn(() =>
        Promise.resolve({ status: STATUS_OK, data: avatarBase64Url })
      );

      await actions[GET_PHOTO](fakeStore);

      expect(identityRepository.getAvatar).toHaveBeenCalledWith(objectId);
      expect(fakeStore.commit).toHaveBeenCalledWith(SET_PROFILE_DATA, {
        avatarLink: avatarBase64Url,
        objectId,
      });
    });

    it('should throw exception if failed to get photo', async () => {
      const objectId = '23gh234jhhwej';

      const fakeStore = {
        commit: jest.fn(),
        state: {
          profileData: {
            objectId,
            avatarLink: null,
          },
        },
      };

      identityRepository.getAvatar = jest.fn(() =>
        Promise.resolve({ status: STATUS_INTERNAL_SERVER_ERROR })
      );

      let exceptionFlag = false;
      try {
        await actions[GET_PHOTO](fakeStore);
      } catch {
        exceptionFlag = true;
      }

      expect(identityRepository.getAvatar).toHaveBeenCalledWith(objectId);
      expect(fakeStore.commit).not.toHaveBeenCalled();
      expect(exceptionFlag).toBeTruthy();
    });
  });
});
