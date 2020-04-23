import { BE_CALL_TYPES } from '@/constants';
import getters from '@/store/realtimeDashboard/getters';

const rootGetters = {
  tenantId: 1,
  allDevices: {
    1: { id: 1, udid: 1, deviceName: '1' },
    2: { id: 2, udid: 2, deviceName: '2' },
    3: { id: 3, udid: 3, deviceName: '3' },
  },
  tenantUsers: {
    1: {
      1: { objectId: 1, userName: '1', companyId: 1 },
      11: { objectId: 11, userName: '11', companyId: 1 },
    },
    2: {
      2: { objectId: 2, userName: '2', companyId: 2 },
      22: { objectId: 22, userName: '22', companyId: 2 },
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
};

const mockGetters = {
  waitingCallbacks: {
    count: 2,
    items: [
      {
        callType: BE_CALL_TYPES.VIDEO_CALLBACK,
        requestedAt: '2020-03-10T00:00:53Z',
        requestedBy: 1,
        salesRepId: 1,
        deviceId: 1,
        callbacks: [
          {
            requestedAt: '2020-03-10T00:00:52Z',
            requestedBy: 1,
          },
        ],
      },
      {
        callType: BE_CALL_TYPES.VIDEO_CALLBACK,
        requestedAt: '2020-03-10T00:00:56Z',
        requestedBy: 2,
        salesRepId: 2,
        deviceId: 2,
        callbacks: [
          {
            requestedAt: '2020-03-10T00:00:55Z',
            requestedBy: 2,
          },
        ],
      },
    ],
  },
  waitingCalls: {
    count: 2,
    items: [
      {
        requestedAt: '2020-03-10T00:00:05Z',
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
  },
};

const state = {
  activeCalls: {
    count: 2,
    items: [
      {
        requestedAt: '2020-03-10T00:00:00Z',
        requestedBy: 1,
        salesRepId: 1,
        acceptedBy: 11,
        acceptedAt: '2020-03-10T00:00:15Z',
        deviceId: 1,
      },
      {
        requestedAt: '2020-03-10T00:00:00Z',
        requestedBy: 2,
        salesRepId: 2,
        acceptedBy: 22,
        acceptedAt: '2020-03-10T00:00:17Z',
        deviceId: 2,
      },
    ],
  },
  waitingCalls: {
    count: 2,
    items: [
      {
        requestedAt: '2020-03-10T00:00:05Z',
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
  },
  callStatisticsCallbacksMissed: 4,
  callStatisticsCallbacksAnswered: 1,
  waitingCallbacks: {
    count: 2,
    serverTime: '2020-03-10T00:00:01',
    items: [
      {
        callType: BE_CALL_TYPES.VIDEO_CALLBACK,
        requestedAt: '2020-03-10T00:00:53Z',
        requestedBy: 1,
        salesRepId: 1,
        deviceId: 1,
        callbacks: [
          {
            requestedAt: '2020-03-10T00:00:52Z',
            requestedBy: 1,
          },
        ],
      },
      {
        callType: BE_CALL_TYPES.VIDEO_CALLBACK,
        requestedAt: '2020-03-10T00:00:56Z',
        requestedBy: 2,
        salesRepId: 2,
        deviceId: 2,
        callbacks: [
          {
            requestedAt: '2020-03-10T00:00:55Z',
            requestedBy: 2,
          },
        ],
      },
    ],
  },
};

describe('storage getters:', () => {
  describe('waitingCalls getter:', () => {
    it('should return value with mapped fields', () => {
      const expected = {
        count: 2,
        items: [
          {
            requestedAt: '2020-03-10T00:00:00Z',
            requestedBy: 2,
            salesRepId: 2,
            deviceId: 2,
            deviceName: '2',
            companyName: 'N/A',
            salesRepName: 2,
          },
          {
            requestedAt: '2020-03-10T00:00:05Z',
            requestedBy: 1,
            salesRepId: 1,
            deviceId: 1,
            deviceName: '1',
            companyName: '1',
            salesRepName: '1',
          },
        ],
      };

      // get the result from the getter
      expect(getters.waitingCalls(state, null, null, rootGetters)).toStrictEqual(expected);
    });
  });
  describe('waitingCallbacks getter:', () => {
    it('should return value with mapped fields', () => {
      const expected = {
        count: 2,
        serverTime: '2020-03-10T00:00:01',
        items: [
          {
            callType: BE_CALL_TYPES.VIDEO_CALLBACK,
            requestedAt: '2020-03-10T00:00:53Z',
            requestedBy: 1,
            salesRepId: 1,
            deviceId: 1,
            deviceName: '1',
            companyName: '1',
            salesRepName: '1',
            callbacks: [
              {
                requestedAt: '2020-03-10T00:00:52Z',
                requestedBy: 1,
              },
            ],
          },
          {
            callType: BE_CALL_TYPES.VIDEO_CALLBACK,
            requestedAt: '2020-03-10T00:00:56Z',
            requestedBy: 2,
            salesRepId: 2,
            deviceId: 2,
            deviceName: '2',
            companyName: 'N/A',
            salesRepName: 2,
            callbacks: [
              {
                requestedAt: '2020-03-10T00:00:55Z',
                requestedBy: 2,
              },
            ],
          },
        ],
      };

      // get the result from the getter
      expect(getters.waitingCallbacks(state, null, null, rootGetters)).toStrictEqual(expected);
    });
  });
  describe('allWaitingCalls getter:', () => {
    it('should return value in correct order', () => {
      const expected = [...mockGetters.waitingCallbacks.items, ...mockGetters.waitingCalls.items];

      // get the result from the getter
      expect(getters.allWaitingCalls(state, mockGetters)).toStrictEqual(expected);
    });
  });
  describe('activeCalls getter:', () => {
    it('should return value with mapped fields', () => {
      const expected = {
        count: 2,
        items: [
          {
            requestedAt: '2020-03-10T00:00:00Z',
            requestedBy: 2,
            acceptedBy: 22,
            acceptedAt: '2020-03-10T00:00:17Z',
            salesRepId: 2,
            deviceId: 2,
            operatorName: 22,
            deviceName: '2',
            companyName: 'N/A',
            salesRepName: 2,
          },
          {
            requestedAt: '2020-03-10T00:00:00Z',
            requestedBy: 1,
            acceptedBy: 11,
            acceptedAt: '2020-03-10T00:00:15Z',
            salesRepId: 1,
            deviceId: 1,
            deviceName: '1',
            operatorName: '11',
            companyName: '1',
            salesRepName: '1',
          },
        ],
      };

      // get the result from the getter
      expect(getters.activeCalls(state, null, null, rootGetters)).toStrictEqual(expected);
    });
  });

  describe('callStatisticsCallbacksMissed getter:', () => {
    it('should return value with mapped fields', () => {
      const expected = 4;
      // get the result from the getter
      expect(getters.callStatisticsCallbacksMissed(state)).toStrictEqual(expected);
    });
  });

  describe('callStatisticsCallbacksAnswered getter:', () => {
    it('should return value with mapped fields', () => {
      const expected = 1;
      // get the result from the getter
      expect(getters.callStatisticsCallbacksAnswered(state)).toStrictEqual(expected);
    });
  });
});
