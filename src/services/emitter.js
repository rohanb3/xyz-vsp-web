/* eslint-disable no-use-before-define */

import ee from 'event-emitter';

const emitter = ee();

export function subscribe(eventName, listener) {
  emitter.on(eventName, listener);
  return () => unsubscribe(eventName, listener);
}

export function unsubscribe(eventName, listener) {
  emitter.off(eventName, listener);
}

export function emit(eventName, ...args) {
  emitter.emit(eventName, ...args);
}

export function subscribeMultiple(listeners = {}) {
  return Object.keys(listeners).reduce((acc, eventName) => {
    const unsubscriber = subscribe(eventName, listeners[eventName]);
    acc[eventName] = unsubscriber;
    return acc;
  }, {});
}

export function unsubscribeMultiple(listeners) {
  Object.keys(listeners).forEach(eventName => unsubscribe(eventName, listeners[eventName]));
}
