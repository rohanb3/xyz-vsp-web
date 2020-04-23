import {
  emulateAnswer,
  on,
  once,
  emit,
  off,
  getSocket,
  resetMocks,
} from '@/../tests/unit/socketEmulator';

import * as utils from '@/services/vspSocket/utils';

import * as transport from '@/services/vspSocket/transport';

import { OPERATOR_SOCKET } from '@/constants';

const { EVENTS } = OPERATOR_SOCKET;

const DELAY = 200;

function waitForTimeout(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

describe('vspSocket/utils.js', () => {
  beforeEach(() => {
    resetMocks();
    transport.getSocket = jest.fn(getSocket);
  });

  describe('waitForEvent(): ', () => {
    it('should return promise which wiil be resolved when socket event will be received from', async () => {
      const event = 'event-name';
      const data = { some: 'data' };

      let promiseResolved = false;

      const { promise } = utils.waitForEvent(event);
      expect(once).toHaveBeenCalledWith(event, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      emulateAnswer('incorrect-event');

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      emulateAnswer(event, data);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(true);
      await expect(promise).resolves.toBe(data);
    });

    it('should resolve promise with first received socket event data', async () => {
      const event = 'event-name';
      const data = { some: 'data' };
      const data2 = { some: 'data2' };

      let promiseResolved = false;

      const { promise } = utils.waitForEvent(event);
      expect(once).toHaveBeenCalledWith(event, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      emulateAnswer(event, data);
      emulateAnswer(event, data2);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(true);

      await expect(promise).resolves.toBe(data);
    });

    it('should return stop() function which will stop waiting socket event', async () => {
      const event = 'event-name';
      const data = { some: 'data' };

      let promiseResolved = false;

      const { promise, stop } = utils.waitForEvent(event);
      expect(once).toHaveBeenCalledWith(event, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      stop();
      expect(off).toHaveBeenCalledWith(event, expect.any(Function));

      emulateAnswer(event, data); // event after stop() won't resolve promise

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
    });
  });

  describe('justWaitForEvent(): ', () => {
    it('should return promise without any ability to stop waiting socket event', async () => {
      const event = 'event-name';
      const data = { some: 'data' };

      let promiseResolved = false;

      const promise = utils.justWaitForEvent(event);
      expect(once).toHaveBeenCalledWith(event, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      emulateAnswer(event, data);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(true);
      await expect(promise).resolves.toBe(data);
    });
  });

  describe('waitOperationForbidden(): ', () => {
    it('should return promise which will be resolved when FORBIDDEN socket event with correct operation will be received', async () => {
      const operation = 'operation1';
      const expectedData = { operation };

      let promiseResolved = false;

      const { promise } = utils.waitOperationForbidden(operation);
      expect(on).toHaveBeenCalledWith(EVENTS.FORBIDDEN, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      emulateAnswer(EVENTS.FORBIDDEN, { operation: 'other-operation' });

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      emulateAnswer(EVENTS.FORBIDDEN, { operation });

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(true);
      await expect(promise).resolves.toEqual(expectedData);
    });

    it('should return stop() function which will stop waiting socket event', async () => {
      const operation = 'operation1';

      let promiseResolved = false;

      const { promise, stop } = utils.waitOperationForbidden(operation);
      expect(on).toHaveBeenCalledWith(EVENTS.FORBIDDEN, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      stop();
      expect(off).toHaveBeenCalledWith(EVENTS.FORBIDDEN, expect.any(Function));

      emulateAnswer(EVENTS.FORBIDDEN, { operation }); // event after stop() won't resolve promise

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
    });
  });

  describe('justWaitOperationForbidden(): ', () => {
    it('should return promise without any ability to stop waiting socket event', async () => {
      const operation = 'operation1';
      const expectedData = { operation };

      let promiseResolved = false;

      const promise = utils.justWaitOperationForbidden(operation);
      expect(on).toHaveBeenCalledWith(EVENTS.FORBIDDEN, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      emulateAnswer(EVENTS.FORBIDDEN, { operation });

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(true);
      await expect(promise).resolves.toEqual(expectedData);
    });
  });

  describe('waitPubSubEvent(): ', () => {
    it('should return promise which will be resolved when pubSub event will be received', async () => {
      jest.spyOn(transport.pubSub, 'subscribeOnce');

      const event = 'event-name';
      const data = { some: 'data' };

      let promiseResolved = false;

      const { promise } = utils.waitPubSubEvent(event);
      expect(transport.pubSub.subscribeOnce).toHaveBeenCalledWith(event, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      transport.pubSub.emit('other-event', {});

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      transport.pubSub.emit(event, data);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(true);
      await expect(promise).resolves.toBe(data);
    });

    it('should return stop() function which will stop waiting pubSub event', async () => {
      jest.spyOn(transport.pubSub, 'subscribeOnce');
      jest.spyOn(transport.pubSub, 'unsubscribe');

      const event = 'event-name';
      const data = { some: 'data' };

      let promiseResolved = false;

      const { promise, stop } = utils.waitPubSubEvent(event);
      expect(transport.pubSub.subscribeOnce).toHaveBeenCalledWith(event, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      stop();
      expect(transport.pubSub.unsubscribe).toHaveBeenCalledWith(event, expect.any(Function));

      transport.pubSub.emit(event, data);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
    });
  });

  describe('justWaitPubSubEvent(): ', () => {
    it('should return promise without any ability to stop waiting pubSub event', async () => {
      jest.spyOn(transport.pubSub, 'subscribeOnce');

      const event = 'event-name';
      const data = { some: 'data' };

      let promiseResolved = false;

      const promise = utils.justWaitPubSubEvent(event);
      expect(transport.pubSub.subscribeOnce).toHaveBeenCalledWith(event, expect.any(Function));
      promise.then(() => {
        promiseResolved = true;
      });

      expect(promiseResolved).toBe(false);

      transport.pubSub.emit('other-event', {});

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      transport.pubSub.emit(event, data);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(true);
      await expect(promise).resolves.toBe(data);
    });
  });

  describe('runOperation(): ', () => {
    it('should emit operation with payload and return promise which will be resolved when success socket event will be received', async () => {
      const operation = 'event-name';
      const payload = { some: 'data' };

      const successEvent = 'event-name-success';
      const successPayload = { response: 'other-data' };

      let promiseResolved = false;

      jest.spyOn(utils.self, 'waitForEvent');
      jest.spyOn(utils.self, 'waitOperationForbidden');

      const promise = utils.runOperation(operation, payload, successEvent);
      promise.then(() => {
        promiseResolved = true;
      });

      expect(emit).toHaveBeenCalledWith(operation, payload);

      expect(utils.self.waitForEvent).toHaveBeenCalledWith(successEvent);
      expect(utils.self.waitForEvent).toHaveBeenCalledWith(EVENTS.UNAUTHORIZED);
      expect(utils.self.waitOperationForbidden).toHaveBeenCalledWith(operation);

      expect(promiseResolved).toBe(false);

      emulateAnswer('incorrect-event');

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);

      emulateAnswer(successEvent, successPayload);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(true);
      await expect(promise).resolves.toBe(successPayload);
    });

    it('should emit operation with payload and return promise which will be rejected when error socket event will be received', async () => {
      const operation = 'event-name';
      const payload = { some: 'data' };

      const successEvent = 'event-name-success';
      const errorEvent = 'event-name-error';
      const errorPayload = { message: 'data' };

      let promiseResolved = false;
      let promiseRejected = false;

      jest.spyOn(utils.self, 'waitForEvent');
      jest.spyOn(utils.self, 'waitOperationForbidden');

      const promise = utils.runOperation(operation, payload, successEvent, errorEvent);
      promise.then(
        () => {
          promiseResolved = true;
        },
        () => {
          promiseRejected = true;
        }
      );

      expect(emit).toHaveBeenCalledWith(operation, payload);

      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(false);

      emulateAnswer('incorrect-event');

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(false);

      emulateAnswer(errorEvent, errorPayload);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(true);
      await expect(promise).rejects.toBe(errorPayload);
    });

    it('should emit operation with payload and return promise which will be rejected when unauthorized socket event will be received', async () => {
      const operation = 'event-name';
      const payload = { some: 'data' };

      const successEvent = 'event-name-success';

      const unauthorizedEvent = EVENTS.UNAUTHORIZED;
      const unauthorizedPayload = { message: 'data' };

      let promiseResolved = false;
      let promiseRejected = false;

      jest.spyOn(utils.self, 'waitForEvent');
      jest.spyOn(utils.self, 'waitOperationForbidden');

      const promise = utils.runOperation(operation, payload, successEvent);
      promise.then(
        () => {
          promiseResolved = true;
        },
        () => {
          promiseRejected = true;
        }
      );

      expect(emit).toHaveBeenCalledWith(operation, payload);

      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(false);

      emulateAnswer('incorrect-event');

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(false);

      emulateAnswer(unauthorizedEvent, unauthorizedPayload);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(true);
      await expect(promise).rejects.toBe(unauthorizedPayload);
    });

    it('should emit operation with payload and return promise which will be rejected when permission denied socket event will be received', async () => {
      const operation = 'event-name';
      const payload = { some: 'data' };

      const successEvent = 'event-name-success';

      const forbiddenEvent = EVENTS.FORBIDDEN;
      const forbiddenPayload = { operation };

      let promiseResolved = false;
      let promiseRejected = false;

      jest.spyOn(utils.self, 'waitForEvent');
      jest.spyOn(utils.self, 'waitOperationForbidden');

      const promise = utils.runOperation(operation, payload, successEvent);
      promise.then(
        () => {
          promiseResolved = true;
        },
        () => {
          promiseRejected = true;
        }
      );

      expect(emit).toHaveBeenCalledWith(operation, payload);

      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(false);

      emulateAnswer('incorrect-event');

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(false);

      emulateAnswer(forbiddenEvent, forbiddenPayload);

      await waitForTimeout(DELAY);
      expect(promiseResolved).toBe(false);
      expect(promiseRejected).toBe(true);
      await expect(promise).rejects.toBe(forbiddenPayload);
    });
  });
});
