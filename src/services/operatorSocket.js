/* eslint-disable no-use-before-define, import/prefer-default-export */
import io from 'socket.io-client';

let socket = null;

const CONNECT = 'connect';
const AUTHENTICATION = 'authentication';
const AUTHENTICATED = 'authenticated';
const UNAUTHORIZED = 'unauthorized';
const INCOMING_CALL = 'incoming.call';
const ROOM_CREATED = 'room.created';
const FINISH_CALL = 'finish.call';
const JOIN_ROOM = 'join.room';
const ACCEPT_CALL = 'accept.call';

export function authenticate(authData) {
  return new Promise((resolve, reject) => {
    socket = socket || io('/operators');

    socket.on(CONNECT, () => {
      socket.emit(AUTHENTICATION, authData);
      socket.on(AUTHENTICATED, resolve);
      socket.on(UNAUTHORIZED, reject);
    });
  });
}

export function initImcomingCallsListening(onIncomingCall) {
  socket.on(INCOMING_CALL, onIncomingCall);
}

export function notifyAboutAcceptingCall() {
  return new Promise(resolve => {
    socket.emit(ACCEPT_CALL);
    socket.once(ROOM_CREATED, resolve);
  });
}

export function notifyAboutJoiningRoom(roomName) {
  socket.emit(JOIN_ROOM, roomName);
}

export function notiyAboutFinishingCall() {
  socket.emit(FINISH_CALL);
}
