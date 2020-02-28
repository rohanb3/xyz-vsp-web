import * as transport from '@/services/vspSocket/transport';
import {
  ioConstructor,
  emulateAnswer,
  on,
  once,
  emit,
  off,
  disconnect,
  resetMocks,
} from 'socket.io-client';

import { OPERATOR_SOCKET } from '@/constants';

const { EVENTS, PUB_SUB_EVENTS } = OPERATOR_SOCKET;

xdescribe('vspSocket/transport.js', () => {
  const identity = 'vsp-operator-1';
  const token = 'some-secure-token';

  let authData;

  beforeEach(() => {
    authData = { identity, token };
    resetMocks();
    transport.disconnect();
  });

  xdescribe('ensureSocket(): ', () => {
    it('should initialize instance on Socket.io, bind handlers and resolves when server answer with authentificated event', async () => {
      const promise = transport.ensureSocket(authData);

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.AUTHENTICATED, {});

      await expect(promise).resolves.toBeDefined();

      expect(ioConstructor).toHaveBeenCalled();
      expect(on).toHaveBeenCalledWith(EVENTS.CONNECT, expect.any(Function));
      expect(on).toHaveBeenCalledWith(EVENTS.DISCONNECT, expect.any(Function));
      expect(on).toHaveBeenCalledWith(EVENTS.RECONNECT, expect.any(Function));
      expect(on).toHaveBeenCalledWith(EVENTS.UNAUTHORIZED, expect.any(Function));
      expect(once).toHaveBeenCalledWith(EVENTS.AUTHENTICATED, expect.any(Function));

      expect(emit).toHaveBeenCalledWith(EVENTS.AUTHENTICATION, authData);
    });

    it('should rejects if server answer UNAUTHORIZED event', async () => {
      const promise = transport.ensureSocket(authData);

      const reason = {
        some: 'reason',
      };

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.UNAUTHORIZED, reason);

      await expect(promise).rejects.toBe(reason);
    });

    it('should use previously created socket during second call to ensureSocket', async () => {
      const promise = transport.ensureSocket(authData);

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.AUTHENTICATED, {});

      await expect(promise).resolves.toBeDefined();

      expect(ioConstructor).toHaveBeenCalled();

      const secondPromise = transport.ensureSocket(authData);
      await expect(secondPromise).resolves.toBeDefined();

      expect(ioConstructor).toHaveBeenCalledTimes(1);
    });

    it('should recreate socket in case of force flag', async () => {
      const promise = transport.ensureSocket(authData);

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.AUTHENTICATED, {});

      await expect(promise).resolves.toBeDefined();

      expect(ioConstructor).toHaveBeenCalled();

      const secondPromise = transport.ensureSocket(authData, true);

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.AUTHENTICATED, {});

      await expect(secondPromise).resolves.toBeDefined();

      expect(ioConstructor).toHaveBeenCalledTimes(2);
    });
  });

  xdescribe('pubSub', () => {
    let handler;
    let data;

    beforeEach(() => {
      handler = jest.fn();
      data = { some: 'data' };
    });

    it('should fire SOCKET_CONNECTED event', () => {
      transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_CONNECTED, handler);

      transport.ensureSocket(authData);
      emulateAnswer(EVENTS.CONNECT, data);

      expect(handler).toHaveBeenCalledWith(data);
    });

    it('should fire SOCKET_DISCONNECTED event', () => {
      transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_DISCONNECTED, handler);

      transport.ensureSocket(authData);
      emulateAnswer(EVENTS.DISCONNECT, data);

      expect(handler).toHaveBeenCalledWith(data);
    });

    it('should fire SOCKET_RECONNECTED event', () => {
      const handler2 = jest.fn();
      transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_RECONNECTED, handler);
      transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_CONNECTED, handler2);

      transport.ensureSocket(authData);
      emulateAnswer(EVENTS.RECONNECT, data);

      expect(handler).toHaveBeenCalledWith(data);
      expect(handler2).toHaveBeenCalledWith(data);
    });

    it('should fire SOCKET_AUTHENTIFICATED event', () => {
      transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, handler);

      transport.ensureSocket(authData);

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.AUTHENTICATED, data);

      expect(handler).toHaveBeenCalledWith(data);
    });

    it('should fire SOCKET_UNAUTHORIZED event', () => {
      transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_UNAUTHORIZED, handler);

      transport.ensureSocket(authData);

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.UNAUTHORIZED, data);

      expect(handler).toHaveBeenCalledWith(data);
    });
  });

  xdescribe('getSocket(): ', () => {
    it('should return socket object', async () => {
      expect(transport.getSocket()).toBe(null);

      const promise = transport.ensureSocket(authData);

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.AUTHENTICATED, {});

      await expect(promise).resolves.toBeDefined();

      const socket = transport.getSocket();
      expect(socket).toBeDefined();
      expect(socket.emit).toBeDefined();
      expect(socket.on).toBeDefined();
    });
  });

  xdescribe('disconnect(): ', () => {
    it('should disconnect and cleanup', async () => {
      const promise = transport.ensureSocket(authData);

      emulateAnswer(EVENTS.CONNECT, {});
      emulateAnswer(EVENTS.AUTHENTICATED, {});

      await expect(promise).resolves.toBeDefined();

      expect(transport.getSocket()).toBeDefined();

      transport.disconnect();

      expect(off).toHaveBeenCalled();
      expect(disconnect).toHaveBeenCalled();
      expect(transport.getSocket()).toBe(null);
    });
  });
});
