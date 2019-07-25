import api from '@/services/devicesApi';
import {
  getDevices,
  getDeviceHistory,
  createDevice,
  updateDevice,
  getCommentByDevice,
  submitComment,
} from '@/services/devicesRepository';

describe('devicesRepository', () => {
  describe('getDevices(): ', () => {
    it('should make request and return data', () => {
      const response = {
        data: {
          result: [],
          total: 0,
        },
      };
      const expectedResult = {
        data: [],
        count: 0,
      };
      api.get = jest.fn(() => Promise.resolve(response));
      return getDevices().then(res => {
        expect(res).toEqual(expectedResult);
        expect(api.get).toHaveBeenCalledWith('/devices', expect.any(Object));
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
  describe('createDevice', () => {
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
  describe('updateDevice', () => {
    it('should call api.put and return data', async () => {
      const id = 1;
      const params = { name: 'device 1' };

      const data = { id, ...params };

      api.put = jest.fn(() => Promise.resolve({ data }));

      const result = await updateDevice(id, params);

      expect(api.put).toHaveBeenCalledWith(`/devices/${id}`, params);
      expect(result).toEqual(data);
    });
  });
  describe('getCommentByDevice', () => {
    it('should call api.get and return data', async () => {
      const data = { result: [], total: 0 };
      const params = { sortDirection: 'desc' };

      const expectedResult = { data: [], count: 0 };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const result = await getCommentByDevice({ id: 1, ...params });

      expect(api.get).toHaveBeenCalledWith(`/devices/${1}/comments`, { params });
      expect(result).toEqual(expectedResult);
    });
  });
  describe('submitComment', () => {
    it('should call api.post and return data', async () => {
      const id = 1;
      const comment = 'comment';

      const data = { id, comment };

      api.post = jest.fn(() => Promise.resolve(data));

      const result = await submitComment(id, comment);

      expect(api.post).toHaveBeenCalledWith(`/devices/${id}/comments`, comment, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(data);
    });
  });
});
