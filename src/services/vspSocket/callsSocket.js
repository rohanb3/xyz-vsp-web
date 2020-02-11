import store from '@/store';
import { OPERATOR_SOCKET } from '@/constants';
import { handleUpdateCallsInfo } from '@/services/callNotifications';
import { log } from '@/services/sentry';

import { SET_PENDING_CALLS_INFO } from '@/store/call/mutationTypes';

import { ensureSocket, getSocket, pubSub as socketPubSub } from './transport';
import './monitor';

export { disconnect } from './transport';

const { EVENTS, PUB_SUB_EVENTS, ERROR_MESSAGES, TOKEN_INVALID } = OPERATOR_SOCKET;

export async function initCallsSocket(authData) {
  try {
    const authResponse = await ensureSocket(authData);
    onAuthenticated(authResponse);
  } catch (e) {
    if (e.message !== TOKEN_INVALID) {
      throw e;
    }
  }

  socketPubSub.subscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, onAuthenticated);
}

function onAuthenticated() {
  getSocket().off(EVENTS.CALLS_CHANGED, onCallsChanged);
  getSocket().on(EVENTS.CALLS_CHANGED, onCallsChanged);
}

function onCallsChanged(data) {
  store.commit(SET_PENDING_CALLS_INFO, data);
  handleUpdateCallsInfo(data);
}

export function notifyAboutAcceptingCall() {
  log('operatorSocket.js -> notifyAboutAcceptingCall()');
  const socket = getSocket();

  return new Promise((resolve, reject) => {
    socket.emit(EVENTS.CALL_ACCEPTED);
    socket.once(EVENTS.ROOM_CREATED, resolve);
    socket.once(EVENTS.CALL_ACCEPTING_FAILED, data =>
      reject(new Error(data.reason || ERROR_MESSAGES.CALL_ACCEPTING_FAILED))
    );
  });
}

export function notifyAboutFinishingCall(callId) {
  getSocket().emit(EVENTS.CALL_FINISHED, callId);
}

export function notifyAboutLeavingRoomEmpty() {
  getSocket().emit(EVENTS.ROOM_LEFT_EMPTY);
}

export function requestCallback(callId) {
  return new Promise((resolve, reject) => {
    const socket = getSocket();

    socket.emit(EVENTS.CALLBACK_REQUESTED, callId);
    socket.once(EVENTS.CALLBACK_ACCEPTED, resolve);
    socket.once(EVENTS.CALLBACK_DECLINED, data => reject(new Error(data.reason)));
    socket.once(EVENTS.CALLBACK_REQUESTING_FAILED, () => reject(new Error()));
  });
}

export function notifyAboutChangingStatusToOnline(data) {
  getSocket().emit(EVENTS.STATUS_CHANGED_ONLINE, data);
}

export function notifyAboutChangingStatusToOffline() {
  getSocket().emit(EVENTS.STATUS_CHANGED_OFFLINE);
}

export function listenToCallFinishing() {
  const socket = getSocket();

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
    getSocket().once(EVENTS.CONNECTION_DROPPED, resolve);
  });
}

export function listenToUnauthorizedConnection() {
  return new Promise((resolve, reject) => {
    getSocket().once(EVENTS.UNAUTHORIZED, reject);
  });
}
