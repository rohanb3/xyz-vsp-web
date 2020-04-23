import { CHANGE_WAITING_CALLS, LOAD_CALLBACKS_DATA } from '@/store/realtimeDashboard/actionTypes';
import {
  WAITING_CALLS_CHANGED,
  INSERT_CALLBACKS_DATA,
} from '@/store/realtimeDashboard/mutationTypes';
import actions from '@/store/realtimeDashboard/actions';
import api from '@/services/realtimeDashboardApi';

describe('storage actions: ', () => {
  describe('CHANGE_WAITING_CALLS: ', () => {
    it('should add mapped fields to items', async () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      const waitingCalls = {
        count: 2,
        items: [
          {
            requestedAt: '2020-03-10T00:00:00Z',
            requestedBy: 1,
            salesRepId: 1,
            deviceId: 1,
          },
          {
            requestedAt: '2020-03-10T00:00:00Z',
            requestedBy: 2,
            salesRepId: 2,
            deviceId: 2,
          },
        ],
      };

      await actions[CHANGE_WAITING_CALLS](fakeStore, waitingCalls);

      expect(fakeStore.commit).toHaveBeenCalledWith(WAITING_CALLS_CHANGED, waitingCalls);
    });
  });

  describe('LOAD_CALLBACKS_DATA: ', () => {
    it('should add mapped fields to items', async () => {
      const fakeStore = {
        commit: jest.fn(),
      };

      const callbacks = {
        answered: 4,
        missed: 3,
        total: 7,
      };

      const filters = {
        gun: true,
        sword: false,
      };

      api.get = jest.fn(() => Promise.resolve({ data: callbacks }));

      await actions[LOAD_CALLBACKS_DATA](fakeStore, { filters });

      expect(fakeStore.commit).toHaveBeenCalledWith(INSERT_CALLBACKS_DATA, callbacks);
    });
  });
});
