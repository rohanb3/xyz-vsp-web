import api from '@/services/identityApi';
import {
  getAvatar,
  requestVerificationCode,
  verifyCode,
  resetPassword,
  updateAvatar,
  deleteAvatar,
  getProfileData,
  login,
  refreshToken,
  getUser,
} from '@/services/identityRepository';
import * as utils from '@/services/utils';
import { RESPONSE_STATUSES } from '@/constants';

const { OK } = RESPONSE_STATUSES;

describe('identityRepository', () => {
  describe('getAvatar', () => {
    it('should call api.get and return correct data', async () => {
      const id = '0e4a5c89-d3b0-42ba-bf68-e207391ce30c';
      const data = { status: 200, data: '123' };

      api.get = jest.fn(() => Promise.resolve({ status: 200, data: 'lol' }));
      utils.imageEncode = jest.fn(() => '123');

      const response = await getAvatar(id);

      expect(response).toEqual(data);
      expect(utils.imageEncode).toHaveBeenCalledWith('lol');
      expect(api.get).toHaveBeenCalledWith(`/users/${id}/avatar`, {
        responseType: 'arraybuffer',
      });
    });
  });

  describe('requestVerificationCode', () => {
    it('should call api.post and return corect data', async () => {
      const email = 'example@example.com';

      const status = OK;
      api.post = jest.fn(() => Promise.resolve({ status }));

      const response = await requestVerificationCode(email);

      expect(response).toEqual(status);
      expect(api.post).toHaveBeenCalledWith('/authorize/request-verification-code', { email });
    });
  });

  describe('verifyCode', () => {
    it('should call api.post and return corect data', async () => {
      const email = 'example@example.com';
      const code = 456;

      const status = OK;
      api.post = jest.fn(() => Promise.resolve({ status }));

      const response = await verifyCode(email, code);

      expect(response).toEqual({ status });
      expect(api.post).toHaveBeenCalledWith('/authorize/verify-code', {
        email,
        code,
      });
    });
  });

  describe('resetPassword', () => {
    it('should call api.post and return corect data', async () => {
      const resetToken = 'erter34h5rb34it34n';
      const password = '12345456';

      const status = OK;
      api.post = jest.fn(() => Promise.resolve({ status }));

      const response = await resetPassword(resetToken, password);

      expect(response).toEqual({ status });
      expect(api.post).toHaveBeenCalledWith('/authorize/reset-password', {
        resetToken,
        password,
      });
    });
  });
  describe('updateAvatar', () => {
    it('should call api.put', async () => {
      const id = 1;
      const updates = {};

      api.put = jest.fn(() => Promise.resolve());

      await updateAvatar(id, updates);

      expect(api.put).toHaveBeenCalledWith(`/users/${id}/avatar`, updates, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    });
  });

  describe('deleteAvatar', () => {
    it('should cal api.delete', async () => {
      const id = 1;

      api.delete = jest.fn(() => Promise.resolve());

      await deleteAvatar(id);

      expect(api.delete).toHaveBeenCalledWith(`/users/${id}/avatar`);
    });
  });
  describe('getUser', () => {
    it('should call api.get and return data', async () => {
      const id = 1;
      const name = 'user';
      const data = { id, name };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const result = await getUser(id);

      expect(api.get).toHaveBeenCalledWith(`/users/${id}`);
      expect(result).toEqual(data);
    });
  });
  describe('refreshToken', () => {
    it('should call api.post and return data', async () => {
      /* eslint-disable */
      const refresh_token = 'refresh_token';
      const access_token = 'access_token';
      const data = { access_token, refresh_token };
      /* eslint-enable */

      api.post = jest.fn(() => Promise.resolve(data));
      const response = await refreshToken(refresh_token);

      expect(api.post).toHaveBeenCalledWith('/authorize/refresh', { refresh_token });
      expect(response).toEqual(data);
    });
  });
  describe('login', () => {
    it('should call api.post and return data', async () => {
      const email = 'email';
      const password = 'password';
      const scope = 'xyzies.authorization.vsp.web';

      const data = { email, id: 1 };

      api.post = jest.fn(() => Promise.resolve(data));
      const result = await login(email, password);

      expect(api.post).toHaveBeenCalledWith('/authorize/token', {
        username: email,
        password,
        scope,
      });
      expect(result).toEqual(data);
    });
  });
  describe('getProfileData', () => {
    it('should call api.get and return data', async () => {
      const data = {
        id: 1,
        name: 'user',
      };

      api.get = jest.fn(() => Promise.resolve({ data }));
      const result = await getProfileData();

      expect(api.get).toHaveBeenCalledWith('/users/profile');
      expect(result).toEqual(data);
    });
  });
});
