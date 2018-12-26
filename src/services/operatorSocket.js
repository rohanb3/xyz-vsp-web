/* eslint-disable no-use-before-define, import/prefer-default-export */
import io from 'socket.io-client';

import { emit, subscribeMultiple } from '@/services/emitter';

let socket = null;
let operatorId = null;

const CONNECT = 'connect';
const AUTHENTICATION = 'authentication';
const AUTHENTICATED = 'authenticated';
const UNAUTHORIZED = 'unauthorized';
const INCOMING_CALL = 'incoming.call';
const ROOM_CREATED = 'room.created';
const FINISH_CALL = 'finish.call';
const JOIN_ROOM = 'join.room';
const ACCEPT_CALL = 'accept.call';
const DECLINE_CALL = 'decline.call';

export function initSocket(authData, listeners = {}) {
  socket = socket || io('/operators');
  operatorId = operatorId || socket.id;

  subscribeMultiple(listeners);

  socket.on(CONNECT, () => {
    authenticate(authData);
    socket.on(AUTHENTICATED, initImcomingCallsListening);
    socket.on(UNAUTHORIZED, onAuthorizationFailed);
  });

  return () => socket.disconnect();
}

export const events = {
  AUTHENTICATED,
  INCOMING_CALL,
  ROOM_CREATED,
};

export function acceptCall() {
  socket.emit(ACCEPT_CALL);
}

export function declineCall() {
  socket.emit(DECLINE_CALL, { operatorId });
}

export function notifyPeerAboutJoiningRoom(roomName) {
  socket.emit(JOIN_ROOM, roomName);
}

export function finishCall() {
  socket.emit(FINISH_CALL);
}

// private methods

function authenticate(data) {
  socket.emit(AUTHENTICATION, data);
}

function initImcomingCallsListening(token) {
  emit(AUTHENTICATED, token);
  socket.on(INCOMING_CALL, onIncomingCall);
  socket.on(ROOM_CREATED, onRoomCreated);
}

function onRoomCreated(roomName) {
  emit(ROOM_CREATED, roomName);
}

function onIncomingCall() {
  emit(INCOMING_CALL);
}

function onAuthorizationFailed() {
  emit(UNAUTHORIZED);
}
