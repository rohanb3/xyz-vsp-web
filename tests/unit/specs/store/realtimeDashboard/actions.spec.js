import { CHANGE_WAITING_CALLS } from '@/store/realtimeDashboard/actionTypes';
import { WAITING_CALLS_CHANGED } from '@/store/realtimeDashboard/mutationTypes';
import actions from '@/store/realtimeDashboard/actions';

describe('storage actions: ', () => {
  describe('CHANGE_WAITING_CALLS: ', () => {
    it('should add mapped fields to items', async () => {
      const fakeStore = {
        commit: jest.fn(),
        rootGetters: {
          tenantId: 1,
          allDevices: {
            1: { id: 1, udid: 1, deviceName: '1' },
            2: { id: 2, udid: 2, deviceName: '2' },
            3: { id: 3, udid: 3, deviceName: '3' },
          },
          tenantUsers: {
            1: {
              1: { objectId: 1, userName: '1', companyId: 1 },
            },
            2: {
              2: { objectId: 2, userName: '2', companyId: 2 },
            },
            3: {
              3: { objectId: 3, userName: '3', companyId: 3 },
            },
            4: {
              4: { objectId: 4, userName: '4', companyId: 4 },
            },
          },
          tenantCompanies: {
            1: {
              1: { id: 1, companyName: '1' },
            },
            2: {
              2: { id: 2, companyName: '2' },
            },
            3: {
              3: { id: 3, companyName: '3' },
            },
            4: {
              4: { id: 4, companyName: '4' },
            },
          },
        },
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

      const expectedResult = {
        count: 2,
        items: [
          {
            requestedAt: '2020-03-10T00:00:00Z',
            requestedBy: 1,
            salesRepId: 1,
            deviceId: 1,
            deviceName: '1',
            companyName: '1',
            salesRepName: '1',
          },
          {
            requestedAt: '2020-03-10T00:00:00Z',
            requestedBy: 2,
            salesRepId: 2,
            deviceId: 2,
            deviceName: '2',
            companyName: 'N/A',
            salesRepName: 2,
          },
        ],
      };

      await actions[CHANGE_WAITING_CALLS](fakeStore, waitingCalls);

      expect(fakeStore.commit).toHaveBeenCalledWith(WAITING_CALLS_CHANGED, expectedResult);
    });
  });
});
