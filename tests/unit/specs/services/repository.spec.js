import api from '@/services/api';
import { getCustomers, getAllCustomersLength } from '@/services/repository';

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

      // sandbox
      //   .stub(api, 'get')
      //   .withArgs('/customers', { params })
      //   .returns(Promise.resolve({ data }));

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

      // sandbox
      //   .stub(api, 'get')
      //   .withArgs('/customers-length')
      //   .returns(Promise.resolve({ data }));

      const response = await getAllCustomersLength();

      expect(response).toEqual(length);
      expect(api.get).toHaveBeenCalledWith('/customers-length');
    });
  });
});
