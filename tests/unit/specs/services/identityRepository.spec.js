import api from '@/services/identityApi';
import {
  getAvatar,
  requestVerificationCode,
  verifyCode,
  resetPassword,
} from '@/services/identityRepository';
import * as utils from '@/services/utils';
import { STATUS_OK } from '@/constants/responseStatuses';

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
      expect(api.get).toHaveBeenCalledWith(`/users/${id}/avatar`, { responseType: 'arraybuffer' });
    });
  });

  describe('requestVerificationCode', () => {
    it('should call api.post and return corect data', async () => {
      const email = 'example@example.com';

      const status = STATUS_OK;
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

      const status = STATUS_OK;
      api.post = jest.fn(() => Promise.resolve({ status }));

      const response = await verifyCode(email, code);

      expect(response).toEqual({ status });
      expect(api.post).toHaveBeenCalledWith('/authorize/verify-code', { email, code });
    });
  });

  describe('resetPassword', () => {
    it('should call api.post and return corect data', async () => {
      const resetToken = 'erter34h5rb34it34n';
      const password = '12345456';

      const status = STATUS_OK;
      api.post = jest.fn(() => Promise.resolve({ status }));

      const response = await resetPassword(resetToken, password);

      expect(response).toEqual({ status });
      expect(api.post).toHaveBeenCalledWith('/authorize/reset-password', { resetToken, password });
    });
  });
});
