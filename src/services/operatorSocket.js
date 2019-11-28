/* eslint-disable no-use-before-define */
import io from 'socket.io-client';
import { OPERATOR_SOCKET } from '@/constants';
import { log } from '@/services/sentry';

const { NAMESPACE, CONNECTION_OPTIONS, EVENTS, ERROR_MESSAGES } = OPERATOR_SOCKET;

let socket = null;

export function init(authData, onCallsChanged, onConnectionChanged) {
  socket = socket || io(NAMESPACE, CONNECTION_OPTIONS);
  socket.off();

  const promise = new Promise((resolve, reject) => {
    const onAuthenticated = data => {
      socket.on(EVENTS.CALLS_CHANGED, onCallsChanged);
      resolve(data);
    };
    const onConnected = () => {
      log('operatorSocket.js -> init()', authData);
      socket.emit(EVENTS.AUTHENTICATION, authData);
      socket.once(EVENTS.AUTHENTICATED, onAuthenticated);
      socket.once(EVENTS.UNAUTHORIZED, reject);
      onConnectionChanged(true);
    };

    socket.on(EVENTS.CONNECT, onConnected);
    socket.on(EVENTS.DISCONNECT, () => onConnectionChanged(false));
    socket.on(EVENTS.RECONNECT, () => onConnectionChanged(true));
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
  log('operatorSocket.js -> notifyAboutAcceptingCall()');
  return new Promise((resolve, reject) => {
    socket.emit(EVENTS.CALL_ACCEPTED);
    socket.once(EVENTS.ROOM_CREATED, resolve);
    socket.once(EVENTS.CALL_ACCEPTING_FAILED, data =>
      reject(new Error(data.reason || ERROR_MESSAGES.CALL_ACCEPTING_FAILED))
    );
  });
}

export function notifyAboutFinishingCall(callId) {
  socket.emit(EVENTS.CALL_FINISHED, callId);
}

export function notifyAboutLeavingRoomEmpty() {
  socket.emit(EVENTS.ROOM_LEFT_EMPTY);
}

export function requestCallback(callId) {
  const promise = new Promise((resolve, reject) => {
    socket.emit(EVENTS.CALLBACK_REQUESTED, callId);
    socket.once(EVENTS.CALLBACK_ACCEPTED, resolve);
    socket.once(EVENTS.CALLBACK_DECLINED, data => reject(new Error(data.reason)));
    socket.once(EVENTS.CALLBACK_REQUESTING_FAILED, () => reject(new Error()));
  });
  return promise;
}

export function notifyAboutChangingStatusToOnline() {
  socket.emit(EVENTS.STATUS_CHANGED_ONLINE);
}

export function notifyAboutChangingStatusToOffline() {
  socket.emit(EVENTS.STATUS_CHANGED_OFFLINE);
}

export function listenToCallFinishing() {
  return new Promise((resolve, reject) => {
    const onCallFinished = () => {
      socket.off(onCallFinished);
      reject(new Error(ERROR_MESSAGES.CALL_FINISED_BY_CUSTOMER));
    };
    socket.once(EVENTS.CALL_FINISHED, onCallFinished);
  });
}

export function listenToConnectionDropped() {
  return new Promise(resolve => {
    socket.once(EVENTS.CONNECTION_DROPPED, resolve);
  });
}

export function listenToUnauthorizedConnection() {
  return new Promise((resolve, reject) => {
    socket.once(EVENTS.UNAUTHORIZED, reject);
  });
}
