/* eslint-disable no-use-before-define */
import { SET_NETWORK_STATUS } from '@/store/network/mutationTypes';
import { DOM_EVENTS } from '@/constants';

const { ONLINE, OFFLINE, BEFORE_UNLOAD } = DOM_EVENTS;

let initialized = false;
let store = null;

export function init(storeInstance) {
  if (!initialized) {
    initialized = true;
    store = storeInstance;

    window.addEventListener(ONLINE, setOnlineStatus);
    window.addEventListener(OFFLINE, setOfflineStatus);
    window.addEventListener(BEFORE_UNLOAD, shutdown);
  }
}

export function shutdown() {
  initialized = false;

  window.removeEventListener(ONLINE, setOnlineStatus);
  window.removeEventListener(OFFLINE, setOfflineStatus);
}

function setOnlineStatus() {
  store.commit(SET_NETWORK_STATUS, true);
}

function setOfflineStatus() {
  store.commit(SET_NETWORK_STATUS, false);
}
