/* eslint-disable no-use-before-define */
import io from 'socket.io-client';
import { namespace, connectionOptions, events, errorMessages } from '@/constants/operatorSocket';

let socket = null;

export function init(authData, onCallsChanged, onConnectionChanged) {
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
      onConnectionChanged(true);
    };

    socket.on(events.CONNECT, onConnected);
    socket.on(events.DISCONNECT, () => onConnectionChanged(false));
    socket.on(events.RECONNECT, () => onConnectionChanged(true));
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
  return new Promise((resolve, reject) => {
    socket.emit(events.CALL_ACCEPTED);
    socket.once(events.ROOM_CREATED, resolve);
    socket.once(events.CALL_ACCEPTING_FAILED, data =>
      reject(new Error(data.reason || errorMessages.CALL_ACCEPTING_FAILED))
    );
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
    socket.once(events.CALLBACK_DECLINED, data => reject(new Error(data.reason)));
    socket.once(events.CALLBACK_REQUESTING_FAILED, () => reject(new Error()));
  });
  return promise;
}

export function notifyAboutChangingStatusToOnline() {
  socket.emit(events.STATUS_CHANGED_ONLINE);
}

export function notifyAboutChangingStatusToOffline() {
  socket.emit(events.STATUS_CHANGED_OFFLINE);
}

export function listenToCallFinishing() {
  return new Promise((resolve, reject) => {
    const onCallFinished = () => {
      socket.off(onCallFinished);
      reject(new Error(errorMessages.CALL_FINISED_BY_CUSTOMER));
    };
    socket.once(events.CALL_FINISHED, onCallFinished);
  });
}
