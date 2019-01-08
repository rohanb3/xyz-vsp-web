import api from '@/services/api';
import {
  getCustomers,
  getAllCustomersLength,
  getCalls,
  getAllCallsLength,
  getOperatorReview,
} from '@/services/repository';

describe('repository', () => {
  describe('getCustomers', () => {
    it('should call api.get and return corect data', async () => {
      const startFrom = 10;
      const count = 20;
      const params = {
        startFrom,
        count,
      };
      const items = [{ id: 123 }, { id: 321 }];
      const data = {
        items,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCustomers(startFrom, count);

      expect(response).toEqual(items);
      expect(api.get).toHaveBeenCalledWith('/customers', { params });
    });
  });

  describe('getAllCustomersLength', () => {
    it('should call api.get and return corect data', async () => {
      const length = 4;
      const data = {
        length,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getAllCustomersLength();

      expect(response).toEqual(length);
      expect(api.get).toHaveBeenCalledWith('/customers-length');
    });
  });

  describe('getCalls', () => {
    it('should call api.get and return corect data', async () => {
      const startFrom = 10;
      const count = 20;
      const params = {
        startFrom,
        count,
      };
      const items = [{ id: 123 }, { id: 321 }];
      const data = {
        items,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCalls(startFrom, count);

      expect(response).toEqual(items);
      expect(api.get).toHaveBeenCalledWith('/calls', { params });
    });
  });

  describe('getAllCallsLength', () => {
    it('should call api.get and return corect data', async () => {
      const length = 4;
      const data = {
        length,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getAllCallsLength();

      expect(response).toEqual(length);
      expect(api.get).toHaveBeenCalledWith('/calls-length');
    });
  });

  describe('getOperatorReview', () => {
    it('should call api.get and return corect data', async () => {
      const data = {
        items: [1, 2, 3],
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getOperatorReview();

      expect(response).toEqual(data.items);
      expect(api.get).toHaveBeenCalledWith('/operator-review');
    });
  });
});
