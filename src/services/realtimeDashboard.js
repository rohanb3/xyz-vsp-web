import {
  subscribe as socketSubscribe,
  unsubscribe as socketUnsubscribe,
  subscribeWaitingCallsChanged,
} from '@/services/vspSocket/realtimeDashboardSocket';
import store from '@/store';
import { WAITING_CALLS_CHANGED } from '@/store/realtimeDashboard/mutationTypes';

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
  store.commit(WAITING_CALLS_CHANGED, data);
}
