import store from '@/store';
import { OPERATOR_SOCKET } from '@/constants';

import * as transport from '@/services/vspSocket/transport';
import '@/services/vspSocket/monitor';
import * as realtimeDashboardSocket from '@/services/vspSocket/realtimeDashboardSocket';
import * as realtimeDashboard from '@/services/realtimeDashboard';

import {
  GET_TENANTS_LIST,
  CHANGE_DASHBOARD_TENANT_FILTER,
} from '@/store/realtimeDashboard/actionTypes';

import {
  REALTIME_DASHBOARD_CLEAR_DATA,
} from '@/store/realtimeDashboard/mutationTypes';

const { PUB_SUB_EVENTS } = OPERATOR_SOCKET;

describe('realtimeDashboard: ', () => {
  describe('realtimeDashboard.subscribe: ', async () => {
    it('should fire realtimeDashboardSocket.subscribe with right tenantId', async () => {
      realtimeDashboardSocket.subscribe = jest.fn((id) => Promise.resolve({tenantId: id}));
      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED);
      const tenantId = 13;
      await realtimeDashboard.subscribe(tenantId);
      expect(realtimeDashboardSocket.subscribe).toHaveBeenCalledWith(tenantId);
    });

    it('should fire loadCallsData with right tenantId', async () => {
      realtimeDashboard.self.loadCallsData = jest.fn();
      realtimeDashboardSocket.subscribe = jest.fn((id) => Promise.resolve({tenantId: id}));
      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED);
      const tenantId = 13;
      await realtimeDashboard.subscribe(tenantId);
      expect(realtimeDashboard.self.loadCallsData).toHaveBeenCalledWith(tenantId);
    });

    it('should fire store.dispatch CHANGE_DASHBOARD_TENANT_FILTER event with right tenantId', async () => {
      realtimeDashboardSocket.subscribe = jest.fn((id) => Promise.resolve({tenantId: id}));
      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED);
      const tenantId = 13;
      store.dispatch = jest.fn();
      await realtimeDashboard.subscribe(tenantId);
      expect(store.dispatch).toHaveBeenCalledWith(CHANGE_DASHBOARD_TENANT_FILTER, tenantId);
    });
  });

  describe('realtimeDashboard.unsubscribe: ', async () => {
    it('should fire store.commit REALTIME_DASHBOARD_CLEAR_DATA event', async () => {
      store.commit = jest.fn();
      realtimeDashboard.unsubscribe();
      expect(store.commit).toHaveBeenCalledWith(REALTIME_DASHBOARD_CLEAR_DATA);
    });

    it('should fire realtimeDashboardSocket.socketUnsubscribe function', async () => {
      realtimeDashboardSocket.unsubscribe = jest.fn();
      realtimeDashboard.unsubscribe();
      expect(realtimeDashboardSocket.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('realtimeDashboard.changeTenant: ', async () => {
    it('should fire store.commit REALTIME_DASHBOARD_CLEAR_DATA', async () => {
      store.commit = jest.fn();
      const tenantId = 69;
      realtimeDashboard.changeTenant(tenantId);
      expect(store.commit).toHaveBeenCalledWith(REALTIME_DASHBOARD_CLEAR_DATA);
    });

    it('should fire subscribe with right parameter', async () => {
      store.commit = jest.fn();
      realtimeDashboard.self.subscribe = jest.fn();
      const tenantId = 69;
      realtimeDashboard.changeTenant(tenantId);
      expect(realtimeDashboard.self.subscribe).toHaveBeenCalledWith(tenantId);
    });
  });

  describe('realtimeDashboard.loadTenantsList: ', async () => {
    it('should fire store.dispatch GET_TENANTS_LIST', async () => {
      store.dispatch = jest.fn();
      realtimeDashboard.loadTenantsList();
      expect(store.dispatch).toHaveBeenCalledWith(GET_TENANTS_LIST);
    });
  });
});
