const ONLINE = 'online';
const OFFLINE = 'offline';

let initialized = false;

const listeners = {
  [ONLINE]: [],
  [OFFLINE]: [],
};

function runOnlineListeners() {
  listeners[ONLINE].forEach(listener => listener());
}

function runOfflineListeners() {
  listeners[OFFLINE].forEach(listener => listener());
}

function registerListener(listener, mode) {
  if (listener && typeof listener === 'function') {
    listeners[mode].push(listener);
  }
}

function removeListener(listener, mode) {
  listeners[mode] = listeners[mode].filter(registered => listener !== registered);
}

export function init() {
  if (!initialized) {
    initialized = true;

    window.addEventListener(ONLINE, runOnlineListeners);
    window.addEventListener(OFFLINE, runOfflineListeners);
  }
}

export function shutdown() {
  initialized = false;
  listeners[ONLINE] = [];
  listeners[OFFLINE] = [];

  window.removeEventListener(ONLINE, runOnlineListeners);
  window.removeEventListener(OFFLINE, runOfflineListeners);
}

export function registerOnlineListener(listener) {
  registerListener(listener, ONLINE);
}

export function registerOfflineListener(listener) {
  registerListener(listener, OFFLINE);
}

export function removeOnlineListener(listener) {
  removeListener(listener, ONLINE);
}

export function removeOfflineListener(listener) {
  removeListener(listener, OFFLINE);
}
