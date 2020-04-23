import Emitter from '@/services/Emitter';

const pubSub = new Emitter();
export const emulateAnswer = pubSub.emit.bind(pubSub);

/* eslint-disable import/no-mutable-exports */

export let emit;
export let on;
export let once;
export let off;

export let disconnect;

resetMocks();

function _off(...args) {
  if (args.length) {
    pubSub.unsubscribe(...args);
  } else {
    pubSub.unsubscribeAll();
  }
}

export function getSocket() {
  return {
    on,
    once,
    off,
    emit,
    disconnect,
  };
}

export function resetMocks() {
  emit = jest.fn(pubSub.emit.bind(pubSub));
  on = jest.fn(pubSub.subscribe.bind(pubSub));
  once = jest.fn(pubSub.subscribeOnce.bind(pubSub));
  off = jest.fn(_off);

  disconnect = jest.fn();
}
