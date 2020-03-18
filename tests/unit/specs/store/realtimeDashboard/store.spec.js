import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';

import {
  INSERT_CALLS_ANSWERED_DATA,
  INSERT_CALLS_MISSED_DATA,
  SET_TENANT_LIST,
  SET_TENANT_ID,
  REALTIME_DASHBOARD_CLEAR_DATA,
  REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED,
  REALTIME_DASHBOARD_CALL_ACCEPTED,
  REALTIME_DASHBOARD_CALL_FINISHED,
  ACTIVE_CALLS_CHANGED,
  WAITING_CALLS_CHANGED,
} from '@/store/realtimeDashboard/mutationTypes';
import * as dateHelper from '@/services/dateHelper';

import createRealTimeDashboardStoreConfig from './create-realtime-dashboard-store-config';

describe('realtimeDashboardStore: ', () => {
  let localVue;
  let storeConfig;
  let store;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    storeConfig = createRealTimeDashboardStoreConfig();
    store = new Vuex.Store(cloneDeep(storeConfig));
  });

  describe('store.commit SET_TENANT_ID: ', async () => {
    it('should set right value into state.tenantId', async () => {
      const tenantId = 13;
      store.commit(SET_TENANT_ID, tenantId);
      expect(store.getters.tenantId).toEqual(13);
    });
  });

  describe('store.commit REALTIME_DASHBOARD_CLEAR_DATA: ', async () => {
    it('should reset all need records in store.state', async () => {
      const fullState = {
        waitingCalls: { count: 22 },
        activeCalls: { count: 11 },
        operatorsOffline: 10,
        operatorsOnline: 20,
        operatorsOnCall: 5,
        operatorsAvailable: 5,
        callStatisticsAnswered: { averageWaitingDuration: 1000, maxWaitingDuration: 5000 },
        callStatisticsAbandoned: { total: 10000 },
        tenantsList: [{ id: 101010, name: 'Galaxy Tenant' }],
        tenantId: 151515,
      };

      store.replaceState(fullState);

      store.commit(REALTIME_DASHBOARD_CLEAR_DATA);

      expect(store.getters.waitingCalls).toEqual({});
      expect(store.getters.activeCalls).toEqual({});
      expect(store.getters.operatorsOffline).toEqual(0);
      expect(store.getters.operatorsOnCall).toEqual(0);
      expect(store.getters.operatorsAvailable).toEqual(0);
      expect(store.getters.callStatisticsAnswered).toEqual({});
      expect(store.getters.callStatisticsAbandoned).toEqual({});
      expect(store.getters.tenantsList).toEqual([{ id: 101010, name: 'Galaxy Tenant' }]);
      expect(store.getters.tenantId).toEqual(151515);
    });
  });

  describe('store.commit SET_TENANT_LIST: ', async () => {
    it('should set correct data into state.tenantsList', async () => {
      const actualTenantList = [
        { id: 101011, name: 'Dark Universe Tenant' },
        { id: 101012, name: 'Light Universe Tenant' },
        { id: 101013, name: 'His Shadow Tenant' },
      ];
      const expectedTenantList = [
        { id: 101011, name: 'Dark Universe Tenant' },
        { id: 101012, name: 'Light Universe Tenant' },
        { id: 101013, name: 'His Shadow Tenant' },
      ];
      store.commit(SET_TENANT_LIST, actualTenantList);
      expect(store.getters.tenantsList).toEqual(cloneDeep(expectedTenantList));
    });
  });

  describe('store.commit INSERT_CALLS_MISSED_DATA: ', async () => {
    it('should set correct data into state.callStatisticsAbandoned', async () => {
      const expected = { total: 666 };
      store.commit(INSERT_CALLS_MISSED_DATA, expected);
      expect(store.getters.callStatisticsAbandoned).toEqual(expected);
    });
  });

  describe('store.commit INSERT_CALLS_ANSWERED_DATA: ', async () => {
    it('should set correct data into state.callStatisticsAnswered', async () => {
      const expected = { total: 777 };
      store.commit(INSERT_CALLS_ANSWERED_DATA, expected);
      expect(store.getters.callStatisticsAnswered).toEqual(expected);
    });
  });

  describe('store.commit REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED: ', async () => {
    it('should set correct data into state.operatorsOffline', async () => {
      const input = {
        inactiveOperators: {
          count: 150,
        },
      };
      store.commit(REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED, input);
      expect(store.getters.operatorsOffline).toEqual(150);
    });

    it('should set correct data into state.operatorsAvailable', async () => {
      const fullState = {
        operatorsOnCall: 5,
      };

      store.replaceState(fullState);

      const input = {
        activeOperators: {
          count: 210,
        },
      };
      store.commit(REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED, input);
      expect(store.getters.operatorsAvailable).toEqual(205);
    });
  });

  describe('store.commit REALTIME_DASHBOARD_CALL_ACCEPTED: ', async () => {
    it('should set correct data into state.callStatisticsAnswered if old maxWaitingDuration === new maxWaitingDuration', async () => {
      const customState = {
        callStatisticsAnswered: {
          totalWaitingDuration: 100,
          total: 30,
          averageWaitingDuration: 3.33,
          maxWaitingDuration: 11,
        },
      };

      store.replaceState(customState);

      const input = {
        waitingDuration: 10,
      };

      const expected = {
        callStatisticsAnswered: {
          totalWaitingDuration: 110,
          total: 31,
          averageWaitingDuration: 3.5483870967741935,
          maxWaitingDuration: 11,
        },
      };
      store.commit(REALTIME_DASHBOARD_CALL_ACCEPTED, input);
      expect(store.getters.callStatisticsAnswered).toEqual(expected.callStatisticsAnswered);
    });

    it('should set correct data into state.callStatisticsAnswered if old maxWaitingDuration < new maxWaitingDuration', async () => {
      const customState = {
        callStatisticsAnswered: {
          totalWaitingDuration: 100,
          total: 30,
          averageWaitingDuration: 3.33,
          maxWaitingDuration: 11,
        },
      };

      store.replaceState(customState);

      const input = {
        waitingDuration: 15,
      };

      const expected = {
        callStatisticsAnswered: {
          maxWaitingDuration: 15,
        },
      };
      store.commit(REALTIME_DASHBOARD_CALL_ACCEPTED, input);
      expect(store.getters.callStatisticsAnswered.maxWaitingDuration).toEqual(
        expected.callStatisticsAnswered.maxWaitingDuration
      );
    });

    it('should set correct data into state.callStatisticsAnswered if old maxWaitingDuration > new maxWaitingDuration', async () => {
      const customState = {
        callStatisticsAnswered: {
          totalWaitingDuration: 100,
          total: 30,
          averageWaitingDuration: 3.33,
          maxWaitingDuration: 11,
        },
      };

      store.replaceState(customState);

      const input = {
        waitingDuration: 10,
      };

      const expected = {
        callStatisticsAnswered: {
          maxWaitingDuration: 11,
        },
      };
      store.commit(REALTIME_DASHBOARD_CALL_ACCEPTED, input);
      expect(store.getters.callStatisticsAnswered.maxWaitingDuration).toEqual(
        expected.callStatisticsAnswered.maxWaitingDuration
      );
    });
  });

  describe('store.commit REALTIME_DASHBOARD_CALL_FINISHED: ', async () => {
    it('should increment state.callStatisticsAnswered if missedAt field is present in input data', async () => {
      const customState = {
        callStatisticsAbandoned: {
          total: 9,
        },
      };
      const expected = {
        callStatisticsAbandoned: {
          total: 10,
        },
      };
      store.replaceState(customState);
      const input = { missedAt: '12-jan-2020' };
      store.commit(REALTIME_DASHBOARD_CALL_FINISHED, input);
      expect(store.getters.callStatisticsAbandoned.total).toEqual(
        expected.callStatisticsAbandoned.total
      );
    });

    it('should not increment state.callStatisticsAnswered if missedAt field is not present in input data', async () => {
      const customState = {
        callStatisticsAbandoned: {
          total: 9,
        },
      };
      const expected = {
        callStatisticsAbandoned: {
          total: 9,
        },
      };
      store.replaceState(customState);
      const input = {};
      store.commit(REALTIME_DASHBOARD_CALL_FINISHED, input);
      expect(store.getters.callStatisticsAbandoned.total).toEqual(
        expected.callStatisticsAbandoned.total
      );
    });
  });

  describe('store.commit ACTIVE_CALLS_CHANGED: ', async () => {
    it('should set correct data into state (activeCalls, operatorsOnCall and operatorsAvailable)', async () => {
      dateHelper.getDifference = jest.fn(() => 1);
      const customState = {
        activeCalls: {
          count: 55,
        },
        operatorsOnCall: 55,
        operatorsOnline: 70,
        operatorsAvailable: 15,
      };
      const expected = {
        activeCalls: {
          count: 66,
          serverTime: '2020-03-10T00:00:01',
          items: [
            {
              requestedAt: '2020-03-10T00:00:02Z',
              acceptedAt: '2020-03-10T00:00:32Z',
              requestedBy: 1,
              salesRepId: 1,
              deviceId: 1,
            },
            {
              requestedAt: '2020-03-10T00:00:02Z',
              acceptedAt: '2020-03-10T00:00:32Z',
              requestedBy: 2,
              salesRepId: 2,
              deviceId: 2,
            },
          ],
        },
        operatorsOnCall: 66,
        operatorsAvailable: 4,
      };
      store.replaceState(customState);
      const input = {
        count: 66,
        serverTime: '2020-03-10T00:00:01',
        items: [
          {
            requestedAt: '2020-03-10T00:00:01Z',
            acceptedAt: '2020-03-10T00:00:31Z',
            requestedBy: 1,
            salesRepId: 1,
            deviceId: 1,
          },
          {
            requestedAt: '2020-03-10T00:00:01Z',
            acceptedAt: '2020-03-10T00:00:31Z',
            requestedBy: 2,
            salesRepId: 2,
            deviceId: 2,
          },
        ],
      };
      store.commit(ACTIVE_CALLS_CHANGED, input);
      expect(store.getters.activeCalls).toEqual(expected.activeCalls);
      expect(store.getters.operatorsOnCall).toEqual(expected.operatorsOnCall);
      expect(store.getters.operatorsAvailable).toEqual(expected.operatorsAvailable);
    });
  });

  describe('store.commit WAITING_CALLS_CHANGED: ', async () => {
    it('should set right value into state.waitingCalls', async () => {
      dateHelper.getDifference = jest.fn(() => 1);

      const waitingCalls = {
        count: 2,
        serverTime: '2020-03-10T00:00:01',
        items: [
          {
            requestedAt: '2020-03-10T00:00:02Z',
            requestedBy: 1,
            salesRepId: 1,
            deviceId: 1,
          },
          {
            requestedAt: '2020-03-10T00:00:03Z',
            requestedBy: 2,
            salesRepId: 2,
            deviceId: 2,
          },
        ],
      };

      const expected = {
        count: 2,
        serverTime: '2020-03-10T00:00:01',
        items: [
          {
            requestedAt: '2020-03-10T00:00:03Z',
            requestedBy: 1,
            salesRepId: 1,
            deviceId: 1,
          },
          {
            requestedAt: '2020-03-10T00:00:04Z',
            requestedBy: 2,
            salesRepId: 2,
            deviceId: 2,
          },
        ],
      };

      store.commit(WAITING_CALLS_CHANGED, waitingCalls);
      expect(store.getters.waitingCalls).toEqual(expected);
      expect(store.getters.waitingCallsCount).toEqual(expected.count);
    });
  });
});
