console.log('socket.io-clients mocked');

import Emitter from '@/services/Emitter';

const pubSub = new Emitter();
export const emulateAnswer = pubSub.emit.bind(pubSub);

export let emit;
export let on;
export let once;
export let off;

export let disconnect;

export let ioConstructor;
resetMocks();

export default _ioConstructor;


function _off(...args) {
  if (args.length) {
    pubSub.unsubscribe(...args);
  } else {
    pubSub.unsubscribeAll();
  }
}

function _ioConstructor() {
  ioConstructor();
  pubSub.unsubscribeAll();

  return {
    on,
    once,
    off,
    emit,
    disconnect,
  };
};

export function resetMocks() {
  emit = jest.fn(pubSub.emit.bind(pubSub));
  on = jest.fn(pubSub.subscribe.bind(pubSub));
  once = jest.fn(pubSub.subscribeOnce.bind(pubSub));
  off = jest.fn(_off);

  disconnect = jest.fn();

  ioConstructor = jest.fn();
}
