import api from '@/services/devicesApi';
import { getDevices, getDeviceHistory } from '@/services/devicesRepository';

describe('devicesRepository', () => {
  describe('getDevices(): ', () => {
    it('should make request and return data', () => {
      const data = {};
      api.get = jest.fn(() => Promise.resolve(data));
      return getDevices().then(res => {
        expect(res).toEqual(data);
        expect(api.get).toHaveBeenCalledWith('/devices');
      });
    });
  });

  describe('getDeviceHistory(): ', () => {
    it('should do nothing if no device id was specified', () => {
      const expectedResponse = {
        data: [],
        count: 0,
      };

      api.get = jest.fn(() => Promise.resolve());

      return getDeviceHistory().then(res => {
        expect(res).toEqual(expectedResponse);
        expect(api.get).not.toHaveBeenCalled();
      });
    });

    it('should make request for history with correct params and map response', () => {
      const filters = {
        offset: 0,
        limit: 42,
      };
      const deviceId = 'device42';
      const requestData = {
        deviceId,
        ...filters,
      };
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const additional = {
        count: 3,
        ...filters,
      };
      const fakeResponse = {
        data: {
          result: items,
          ...additional,
        },
      };
      const expectedResponse = {
        data: items,
        ...additional,
      };
      const expectedUrl = '/devices/device42/history';
      const expectedParams = {
        params: filters,
      };

      api.get = jest.fn(() => Promise.resolve(fakeResponse));

      return getDeviceHistory(requestData).then(res => {
        expect(res).toEqual(expectedResponse);
        expect(api.get).toHaveBeenCalledWith(expectedUrl, expectedParams);
      });
    });
  });
});
