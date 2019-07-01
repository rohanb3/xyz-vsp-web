import api from '@/services/synchronizationApi';
import { lastSyncTime, migrateUsers } from '@/services/synchronizationRepository';

describe('synchronizationRepository', () => {
  describe('lastSyncTime', () => {
    it('should call api.get and return correct data', async () => {
      const data = {
        time: '2019-07-01T09:43:26',
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await lastSyncTime();

      expect(api.get).toHaveBeenCalled();
      expect(response).toEqual(data.time);
    });
  });
  describe('migrateUsers', () => {
    it('should call api.get and return correct data', async () => {
      api.get = jest.fn(() => Promise.resolve());

      await migrateUsers();

      expect(api.get).toHaveBeenCalled();
    });
  });
});
