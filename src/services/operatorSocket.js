/* eslint-disable no-use-before-define, import/prefer-default-export */
import io from 'socket.io-client';
import { namespace, connectionOptions, events } from '@/constants/operatorSocket';

let socket = null;

export function init(authData, onCallsChanged) {
  socket = socket || io(namespace, connectionOptions);

  const promise = new Promise((resolve, reject) => {
    const onAuthenticated = data => {
      socket.on(events.CALLS_CHANGED, onCallsChanged);
      resolve(data);
    };
    const onConnected = () => {
      socket.emit(events.AUTHENTICATION, authData);
      socket.once(events.AUTHENTICATED, onAuthenticated);
      socket.once(events.UNAUTHORIZED, reject);
    };

    socket.on(events.CONNECT, onConnected);
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
    socket.emit(events.CALL_ACCEPTED);
    socket.once(events.ROOM_CREATED, resolve);
  });
}

export function notifyAboutFinishingCall(call) {
  socket.emit(events.CALL_FINISHED, call);
}

export function notifyAboutLeavingRoomEmpty() {
  socket.emit(events.ROOM_LEFT_EMPTY);
}

export function requestCallback(callId) {
  const promise = new Promise((resolve, reject) => {
    socket.emit(events.CALLBACK_REQUESTED, callId);
    socket.once(events.CALLBACK_ACCEPTED, resolve);
    socket.once(events.CALLBACK_DECLINED, reject);
  });
  return promise;
}

export function notifyAboutChangingStatusToOnline() {
  socket.emit(events.STATUS_CHANGED_ONLINE);
}

export function notifyAboutChangingStatusToOffline() {
  socket.emit(events.STATUS_CHANGED_OFFLINE);
}
