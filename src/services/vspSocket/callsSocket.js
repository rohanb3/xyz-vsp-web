import store from '@/store';
import { successEvent, failureEvent } from '@/constants/utils';
import { OPERATOR_SOCKET, OPERATION_CANCELLED } from '@/constants';
import { handleUpdateCallsInfo } from '@/services/callNotifications';
import { log } from '@/services/sentry';

import { SET_PENDING_CALLS_INFO } from '@/store/call/mutationTypes';

import { runOperation } from './utils';
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
  let onCallbackAccepted = null;
  let onCallbackDeclined = null;
  let onCallbackCanceled = null;
  let onCallbackRequestingFailed = null;

  const promise = new Promise((resolve, reject) => {
    const socket = getSocket();

    onCallbackAccepted = resolve;
    onCallbackCanceled = () => reject(new Error(OPERATION_CANCELLED));
    onCallbackDeclined = data => reject(new Error(data.reason));
    onCallbackRequestingFailed = () => reject(new Error());

    socket.emit(EVENTS.CALLBACK_REQUESTED, callId);
    socket.once(EVENTS.CALLBACK_ACCEPTED, onCallbackAccepted);
    socket.once(EVENTS.CALLBACK_DECLINED, onCallbackDeclined);
    socket.once(EVENTS.CALLBACK_REQUESTING_FAILED, onCallbackRequestingFailed);
  });

  const cancellation = () => {
    const socket = getSocket();

    socket.off(EVENTS.CALLBACK_ACCEPTED, onCallbackAccepted);
    socket.off(EVENTS.CALLBACK_DECLINED, onCallbackDeclined);
    socket.off(EVENTS.CALLBACK_REQUESTING_FAILED, onCallbackRequestingFailed);

    return runOperation(
      EVENTS.CALLBACK_REQUESTING_ABORTED,
      callId,
      successEvent(EVENTS.CALLBACK_REQUESTING_ABORTED),
      failureEvent(EVENTS.CALLBACK_REQUESTING_ABORTED)
    ).then(onCallbackCanceled);
  };

  return { promise, cancellation };
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
