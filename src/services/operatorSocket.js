/* eslint-disable no-use-before-define, import/prefer-default-export */
import io from 'socket.io-client';

let socket = null;

const CONNECT = 'connect';
const AUTHENTICATION = 'authentication';
const AUTHENTICATED = 'authenticated';
const UNAUTHORIZED = 'unauthorized';
const CALL_ACCEPTED = 'call.accepted';
const CALL_FINISHED = 'call.finished';
const CALLS_CHANGED = 'calls.changed';
const ROOM_LEFT_EMPTY = 'room.left.empty';
const ROOM_CREATED = 'room.created';

export function init(authData, onCallsChanged) {
  socket = socket || io('/operators', { transports: ['websocket'] });

  const promise = new Promise((resolve, reject) => {
    const onAuthenticated = data => {
      socket.on(CALLS_CHANGED, onCallsChanged);
      resolve(data);
    };
    const onConnected = () => {
      socket.emit(AUTHENTICATION, authData);
      socket.once(AUTHENTICATED, onAuthenticated);
      socket.once(UNAUTHORIZED, reject);
    };

    socket.on(CONNECT, onConnected);
  });

  return promise;
}

export function disconnect() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function notifyAboutAcceptingCall() {
  return new Promise(resolve => {
    socket.emit(CALL_ACCEPTED);
    socket.once(ROOM_CREATED, resolve);
  });
}

export function notifyAboutFinishingCall(call) {
  socket.emit(CALL_FINISHED, call);
}

export function notifyAboutLeavingRoomEmpty() {
  socket.emit(ROOM_LEFT_EMPTY);
}
