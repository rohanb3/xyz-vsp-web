import io from 'socket.io-client';
import { OPERATOR_SOCKET } from '@/constants';
import Emitter from '@/services/Emitter';

const { NAMESPACE, CONNECTION_OPTIONS, EVENTS, PUB_SUB_EVENTS } = OPERATOR_SOCKET;

let socket = null;
let socketAuthentificationPromise = null;
export const pubSub = new Emitter();

export async function ensureSocket(authData, enforceReconnect = false) {
  if (!socket || enforceReconnect) {
    return init(authData);
  }

  return socketAuthentificationPromise;
}

export function disconnect() {
  pubSub.emit(PUB_SUB_EVENTS.SOCKET_DISCONNECTING);

  _disconnect();
}

export function getSocket() {
  return socket;
}

function init(authData) {
  _disconnect();

  socket = io(NAMESPACE, CONNECTION_OPTIONS);

  socketAuthentificationPromise = new Promise((resolve, reject) => {
    const onAuthenticated = data => {
      pubSub.emit(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, data);
      resolve(data);
    };

    const onUnauthorized = data => {
      pubSub.emit(PUB_SUB_EVENTS.SOCKET_UNAUTHORIZED, data);
      reject(data);
    };

    const onConnected = data => {
      socket.emit(EVENTS.AUTHENTICATION, authData);

      socket.once(EVENTS.AUTHENTICATED, onAuthenticated);
      socket.on(EVENTS.UNAUTHORIZED, onUnauthorized);

      pubSub.emit(PUB_SUB_EVENTS.SOCKET_CONNECTED, data);
    };

    socket.on(EVENTS.CONNECT, onConnected);
    socket.on(EVENTS.DISCONNECT, onSocketDisconnected);
    socket.on(EVENTS.RECONNECT, onSocketReconnected);
  });

  return socketAuthentificationPromise;
}

function _disconnect() {
  if (socket) {
    socket.off();
    socket.disconnect();

    socket = null;
    socketAuthentificationPromise = null;
  }
}

function onSocketDisconnected(data) {
  pubSub.emit(PUB_SUB_EVENTS.SOCKET_DISCONNECTED, data);
}

function onSocketReconnected(data) {
  pubSub.emit(PUB_SUB_EVENTS.SOCKET_RECONNECTED, data);
  pubSub.emit(PUB_SUB_EVENTS.SOCKET_CONNECTED, data);
}
