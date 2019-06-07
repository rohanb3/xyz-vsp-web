import api from '@/services/devicesApi';
import { getDevices, createDevice } from '@/services/devicesRepository';

describe('devicesRepository', () => {
  describe('getDevices', () => {
    it('should call api.get and return correct data', async () => {
      const data = { status: 200, data: '123' };

      api.get = jest.fn(() => Promise.resolve(data));

      const response = await getDevices();

      expect(response).toEqual({ data: data.data });
      expect(api.get).toHaveBeenCalledWith('/devices');
    });
  });

  describe('resetPassword', () => {
    it('should call api.post and return corect data', async () => {
      const data = {
        id: 123,
      };

      api.post = jest.fn(() => Promise.resolve({ data }));

      const response = await createDevice(data);

      expect(response).toEqual(data);
      expect(api.post).toHaveBeenCalledWith('/devices', data);
    });
  });
});
