import store from '@/store';
import Emitter from '@/services/Emitter';
import { OPERATOR_SOCKET } from '@/constants';

import * as transport from './transport';
import { runOperation, justWaitPubSubEvent } from './utils';
import './monitor';

const { EVENTS, PUB_SUB_EVENTS, TOKEN_INVALID } = OPERATOR_SOCKET;

const pubSub = new Emitter();
let subscriptionStatus = false;

init();

export async function subscribe(tenantId = null) {
  try {
    console.log('11111');
    const data = await _subscribe(tenantId);
    // transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, _subscribe);
    return data;
  } catch (e) {
    console.error('realtimeDashboardSocket.subscribe error', e);
    subscriptionStatus = false;
    if (e.message !== TOKEN_INVALID) {
      throw e;
    }
  }

  try {
    await justWaitPubSubEvent(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED);
    console.log('22222');
    const data = await _subscribe(tenantId);
    // transport.pubSub.unsubscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, _subscribe);
    // transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, _subscribe);
    return data;
  } catch (e) {
    console.error('realtimeDashboardSocket.subscribe second lap error', e);
    subscriptionStatus = false;
    throw e;
  }
}

export function unsubscribe() {
  console.log('unsubscribe');
  const socket = transport.getSocket();
  if (socket) {
    socket.emit(EVENTS.REALTIME_DASHBOARD_UNSUBSCRIBE);
  }

  unsubscribeListeners();

  subscriptionStatus = false;
  //
  // pubSub.unsubscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, _subscribe);
}

export function subscribeWaitingCallsChanged(handler) {
  pubSub.subscribe(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, handler);
}

export function unsubscribeWaitingCallsChanged(handler) {
  pubSub.unsubscribe(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, handler);
}

export function subscribeActiveCallsChanged(handler) {
  pubSub.subscribe(EVENTS.REALTIME_DASHBOARD_ACTIVE_CALLS_CHANGED, handler);
}

export function unsubscribeActiveCallsChanged(handler) {
  pubSub.unsubscribe(EVENTS.REALTIME_DASHBOARD_ACTIVE_CALLS_CHANGED, handler);
}

export function subscribeRealTimeDashboardCallFinished(handler) {
  pubSub.subscribe(EVENTS.REALTIME_DASHBOARD_CALL_FINISHED, handler);
}

export function unsubscribeRealTimeDashboardCallFinished(handler) {
  pubSub.unsubscribe(EVENTS.REALTIME_DASHBOARD_CALL_FINISHED, handler);
}

export function subscribeRealTimeDashboardCallAccepted(handler) {
  pubSub.subscribe(EVENTS.REALTIME_DASHBOARD_CALL_ACCEPTED, handler);
}

export function unsubscribeRealTimeDashboardCallAccepted(handler) {
  pubSub.unsubscribe(EVENTS.REALTIME_DASHBOARD_CALL_ACCEPTED, handler);
}

export function subscribeRealTimeDashboardOperatorsStatusesChanged(handler) {
  pubSub.subscribe(EVENTS.REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED, handler);
}

export function unsubscribeRealTimeDashboardOperatorsStatusesChanged(handler) {
  pubSub.unsubscribe(EVENTS.REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED, handler);
}

function init() {
  transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED, onSocketAuthentificated);

  transport.pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_DISCONNECTING, () => {
    console.log('SOCKET_DISCONNECTING event received');
    unsubscribe();
  });

}

function onSocketAuthentificated() {
  console.log('realtimeDashboardSocket.onSocketAuthentificated', subscriptionStatus);
  if (subscriptionStatus) {
    _subscribe();
  }
}

async function _subscribe(tenantId = null) {
  console.log('_subscribe');

  try {
    const authData = store.getters.vspSocketCredentials;
    await transport.ensureSocket(authData);

    unsubscribeListeners();
    subscribeListeners();

    const data = await runOperation(
      EVENTS.REALTIME_DASHBOARD_SUBSCRIBE,
      { tenantId },
      EVENTS.REALTIME_DASHBOARD_SUBSCRIBED,
      EVENTS.REALTIME_DASHBOARD_SUBSCRIBTION_ERROR
    );

    subscriptionStatus = true;

    return data;
  } catch (e) {
    console.error('realtimeDashboardSocket._subscribe error', e);
    subscriptionStatus = false;
    throw e;
  }
}

function subscribeListeners() {
  const socket = transport.getSocket();
  if (socket) {
    socket.on(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, onWaitingCallsChanged);
    socket.on(EVENTS.REALTIME_DASHBOARD_ACTIVE_CALLS_CHANGED, onActiveCallsChanged);

    socket.on(EVENTS.REALTIME_DASHBOARD_CALL_FINISHED, onRealTimeDashboardCallFinished);
    socket.on(EVENTS.REALTIME_DASHBOARD_CALL_ACCEPTED, onRealTimeDashboardCallAccepted);
    socket.on(
      EVENTS.REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED,
      onRealTimeDashboardOperatorsStatusesChanged
    );
  }
}

function unsubscribeListeners() {
  const socket = transport.getSocket();
  if (socket) {
    socket.off(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, onWaitingCallsChanged);
    socket.off(EVENTS.REALTIME_DASHBOARD_ACTIVE_CALLS_CHANGED, onActiveCallsChanged);
    socket.off(EVENTS.REALTIME_DASHBOARD_CALL_FINISHED, onRealTimeDashboardCallFinished);
    socket.off(EVENTS.REALTIME_DASHBOARD_CALL_ACCEPTED, onRealTimeDashboardCallAccepted);
    socket.off(
      EVENTS.REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED,
      onRealTimeDashboardOperatorsStatusesChanged
    );
  }
}

function onWaitingCallsChanged(data) {
  pubSub.emit(EVENTS.REALTIME_DASHBOARD_WAITING_CALLS_CHANGED, data);
}

function onActiveCallsChanged(data) {
  pubSub.emit(EVENTS.REALTIME_DASHBOARD_ACTIVE_CALLS_CHANGED, data);
}

function onRealTimeDashboardCallFinished(data) {
  pubSub.emit(EVENTS.REALTIME_DASHBOARD_CALL_FINISHED, data);
}

function onRealTimeDashboardCallAccepted(data) {
  pubSub.emit(EVENTS.REALTIME_DASHBOARD_CALL_ACCEPTED, data);
}

function onRealTimeDashboardOperatorsStatusesChanged(data) {
  pubSub.emit(EVENTS.REALTIME_DASHBOARD_OPERATORS_STATUSES_CHANGED, data);
}
