import { OPERATOR_SOCKET } from '@/constants';

import { getSocket, pubSub } from './transport';

const { EVENTS } = OPERATOR_SOCKET;

export function runOperation(operation, data, successEvent, errorEvent = null) {
  return new Promise((resolve, reject) => {
    getSocket().emit(operation, data);

    const { promise: successPromise, stop: stopWaitingSuccess } = waitForEvent(successEvent);
    const { promise: unauthorizedPromise, stop: stopWaitingUnauthorized } = waitForEvent(
      EVENTS.UNAUTHORIZED
    );
    const { promise: forbiddenPromise, stop: stopWaitingForbidden } = waitOperationForbidden(
      operation
    );

    let stopWaitingError = null;

    if (errorEvent) {
      const wait = waitForEvent(errorEvent);
      stopWaitingError = wait.stop;

      wait.promise.then(reason => {
        reject(reason);
        stopWaitingSuccess();
        stopWaitingUnauthorized();
        stopWaitingForbidden();
      });
    }

    successPromise.then(successData => {
      resolve(successData);
      stopWaitingUnauthorized();
      stopWaitingForbidden();
      if (stopWaitingError) {
        stopWaitingError();
      }
    });
    unauthorizedPromise.then(reason => {
      reject(reason);
      stopWaitingSuccess();
      stopWaitingForbidden();
      if (stopWaitingError) {
        stopWaitingError();
      }
    });
    forbiddenPromise.then(reason => {
      reject(reason);
      stopWaitingSuccess();
      stopWaitingUnauthorized();
      if (stopWaitingError) {
        stopWaitingError();
      }
    });
  });
}

export function waitForEvent(event) {
  let resolver;

  const promise = new Promise(resolve => {
    resolver = resolve;
    getSocket().once(event, resolve);
  });

  const stop = () => {
    getSocket().off(event, resolver);
  };

  return { promise, stop };
}

export function waitOperationForbidden(operation) {
  let resolver;

  function stop() {
    getSocket().off(EVENTS.FORBIDDEN, onEvent);
  }

  function onEvent(data) {
    if (data.operation === operation) {
      stop();
      resolver(data);
    }
  }

  const promise = new Promise(resolve => {
    resolver = resolve;
    getSocket().on(EVENTS.FORBIDDEN, onEvent);
  });

  return { promise, stop };
}

export function waitPubSubEvent(event) {
  let resolver;

  function stop() {
    pubSub.unsubscibe(event, resolver);
  }

  const promise = new Promise(resolve => {
    resolver = resolve;
    pubSub.subscribe(event, resolve);
  });

  return { promise, stop };
}

export function justWaitForEvent(event) {
  const { promise } = waitForEvent(event);
  return promise;
}

export function justWaitOperationForbidden(operation) {
  const { promise } = waitOperationForbidden(operation);
  return promise;
}

export function justWaitPubSubEvent(event) {
  const { promise } = waitPubSubEvent(event);
  return promise;
}
