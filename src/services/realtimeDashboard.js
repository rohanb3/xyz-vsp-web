import {
  subscribe as socketSubscribe,
  unsubscibe as socketUnsubscribe,
  subscribeWaitingCallsChanged,
} from '@/services/vspSocket/realtimeDashboardSocket';

init();

export async function subscribe() {
  return socketSubscribe();
}

export function unsubscribe() {
  return socketUnsubscribe();
}

function init() {
  subscribeWaitingCallsChanged(onWaitingCallsChanged);
}

function onWaitingCallsChanged(data) {
  console.log('realtimedashboard.onWaitingCallsChanged', data);
}
