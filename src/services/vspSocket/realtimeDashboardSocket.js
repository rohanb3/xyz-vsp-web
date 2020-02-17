import store from '@/store';
import Emitter from '@/services/Emitter';
import { OPERATOR_SOCKET } from '@/constants';

import * as transport from './transport';
import { runOperation, justWaitPubSubEvent } from './utils';
import './monitor';

const { EVENTS, PUB_SUB_EVENTS, TOKEN_INVALID } = OPERATOR_SOCKET;

const pubSub = new Emitter();

export async function subscribe() {
  try {
    await _subscribe();
    transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, _subscribe);
    return;
  } catch (e) {
    console.error('realtimeDashboardSocket.subscribe error', e);
    if (e.message !== TOKEN_INVALID) {
      throw e;
    }
  }

  try {
    await justWaitPubSubEvent(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED);

    await _subscribe();
    transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, _subscribe);
  } catch (e) {
    console.error('realtimeDashboardSocket.subscribe second lap error', e);
    throw e;
  }
}

export function unsubscribe() {
  const socket = transport.getSocket();
  if (socket) {
    socket.emit(EVENTS.REALTIME_DASHBOARD_UNSUBSCRIBE);

    unsubscribeListeners();

    pubSub.unsubscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, _subscribe);
  }
}

export function subscribeWaitingCallsChanged(handler) {
  pubSub.subscribe(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, handler);
}

export function unsubscribeWaitingCallsChanged(handler) {
  pubSub.unsubscribe(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, handler);
}

async function _subscribe() {
  try {
    const authData = store.getters.vspSocketCredentials;
    await transport.ensureSocket(authData);

    unsubscribeListeners();
    subscribeListeners();

    return await runOperation(
      EVENTS.REALTIME_DASHBOARD_SUBSCRIBE,
      undefined,
      EVENTS.REALTIME_DASHBOARD_SUBSCRIBED,
      EVENTS.REALTIME_DASHBOARD_SUBSCRIBTION_ERROR
    );
  } catch (e) {
    console.error('realtimeDashboardSocket._subscribe error', e);
    throw e;
  }
}

function subscribeListeners() {
  const socket = transport.getSocket();
  if (socket) {
    socket.on(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, onWaitingCallsChanged);
  }
}

function unsubscribeListeners() {
  const socket = transport.getSocket();
  if (socket) {
    socket.off(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, onWaitingCallsChanged);
  }
}

function onWaitingCallsChanged(data) {
  pubSub.emit(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, data);
}
