import { OPERATOR_SOCKET } from '@/constants';
import * as transport from '@/services/vspSocket/transport';
import * as monitor from '@/services/vspSocket/monitor';
import store from '@/store';
import { SET_CONNECTION_TO_CALL_SOCKET } from '@/store/call/mutationTypes';
import {
  SET_PROFILE_DATA,
  CLEAR_PROFILE_DATA,
  SET_TOKEN,
  REMOVE_TOKEN,
} from '@/store/loggedInUser/mutationTypes';
import { REFRESH_TOKEN, UPDATE_TOKEN } from '@/store/loggedInUser/actionTypes';

const { PUB_SUB_EVENTS, TOKEN_INVALID } = OPERATOR_SOCKET;

function waitForTimeout(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

describe('vspSocket/monitor.js', () => {
  describe('handle vsp connection status', () => {
    it('should save to store connection state after SOCKET_CONNECTED pubSub event', () => {
      store.commit = jest.fn();

      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_CONNECTED);

      expect(store.commit).toHaveBeenCalledWith(SET_CONNECTION_TO_CALL_SOCKET, true);
    });
    it('should save to store connection state after SOCKET_DISCONNECTED pubSub event', () => {
      store.commit = jest.fn();

      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_DISCONNECTED);

      expect(store.commit).toHaveBeenCalledWith(SET_CONNECTION_TO_CALL_SOCKET, false);
    });
    it('should save to store connection state after SOCKET_RECONNECTED pubSub event', () => {
      store.commit = jest.fn();

      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_RECONNECTED);

      expect(store.commit).toHaveBeenCalledWith(SET_CONNECTION_TO_CALL_SOCKET, true);
    });
  });

  describe.only('handle UNAUTHORIZED event', () => {
    let refreshTokenSpy;

    afterEach(() => {
      if (refreshTokenSpy) {
        refreshTokenSpy.mockRestore();
      }
    });

    it('should refresh acces token and reconnect to socket', async () => {
      const payload = { message: TOKEN_INVALID };

      const userName = 'user-name';
      const accessToken = 'new-access-token';
      const refreshToken = 'new-refresh-token';
      const newToken = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
      const expectedNewToken = {
        accessToken,
        refreshToken,
      };

      const newCredentials = {
        identity: userName,
        token: accessToken,
      };

      store.commit(SET_PROFILE_DATA, { objectId: userName });
      store.commit(SET_TOKEN, { accessToken });

      store.dispatch = jest.fn().mockResolvedValue({ data: newToken });
      transport.ensureSocket = jest.fn().mockResolvedValue();
      refreshTokenSpy = jest.spyOn(monitor.self, 'refreshToken');

      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_UNAUTHORIZED, payload);

      // since refresh is async action runned with event we don't have any Promise as a result
      // of operation so we'll just wait some time
      await waitForTimeout(1000);

      expect(monitor.self.refreshToken).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(REFRESH_TOKEN);
      expect(store.dispatch).toHaveBeenCalledWith(UPDATE_TOKEN, expectedNewToken);
      expect(transport.ensureSocket).toHaveBeenCalledWith(newCredentials, true);
    });

    it('should not reconnect to socket if credentials missed', async () => {
      const payload = { message: TOKEN_INVALID };

      const accessToken = 'new-access-token';
      const refreshToken = 'new-refresh-token';
      const newToken = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
      const expectedNewToken = {
        accessToken,
        refreshToken,
      };

      store.commit(CLEAR_PROFILE_DATA);
      store.commit(REMOVE_TOKEN);

      store.dispatch = jest.fn().mockResolvedValue({ data: newToken });
      transport.ensureSocket = jest.fn().mockResolvedValue();
      refreshTokenSpy = jest.spyOn(monitor.self, 'refreshToken');

      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_UNAUTHORIZED, payload);

      // since refresh is async action runned with event we don't have any Promise as a result
      // of operation so we'll just wait some time
      await waitForTimeout(1000);

      expect(monitor.self.refreshToken).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(REFRESH_TOKEN);
      expect(store.dispatch).toHaveBeenCalledWith(UPDATE_TOKEN, expectedNewToken);
      expect(transport.ensureSocket).not.toHaveBeenCalled();
    });

    it('should do nothing in case of wrong structure of UNAUTHORIZED event', async () => {
      const payload = {};

      const accessToken = 'new-access-token';
      const refreshToken = 'new-refresh-token';
      const newToken = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };

      store.dispatch = jest.fn().mockResolvedValue({ data: newToken });
      transport.ensureSocket = jest.fn().mockResolvedValue();
      refreshTokenSpy = jest.spyOn(monitor.self, 'refreshToken');

      transport.pubSub.emit(PUB_SUB_EVENTS.SOCKET_UNAUTHORIZED, payload);

      // since refresh is async action runned with event we don't have any Promise as a result
      // of operation so we'll just wait some time
      await waitForTimeout(1000);

      expect(monitor.self.refreshToken).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(transport.ensureSocket).not.toHaveBeenCalled();
    });
  });
});
