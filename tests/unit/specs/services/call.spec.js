import * as twilio from '@/services/twilio';
import * as callService from '@/services/call';
import * as callsSocket from '@/services/vspSocket/callsSocket';

import store from '@/store';
import { SET_CALL_DATA } from '@/store/call/mutationTypes';

let activeCallData = null;
let call = null;
let testToken = null;
describe('call service:', () => {
  beforeEach(() => {
    call = {
      id: 'testCall',
    };
    testToken = 'testToken';

    activeCallData = call;

    store.getters = {
      activeCallData,
      userId: 123,
    };

    store.replaceState({
      call: {
        token: testToken,
      },
    });
    twilio.disconnect = jest.fn();
    twilio.connect = jest.fn();
  });

  describe('callBack(): ', () => {
    it('should return promise, and call correct methods when it will be resolved', async () => {
      const credentials = { name: call.id, token: testToken };

      callsSocket.requestCallback = jest.fn(() => ({
        promise: Promise.resolve(call),
        cancellation: jest.fn().mockResolvedValue(),
      }));
      callService.self.setConnectingStatus = jest.fn();
      store.commit = jest.fn();

      const result = callService.callBack();

      expect(callService.self.setConnectingStatus).toHaveBeenCalled();
      expect(callsSocket.requestCallback).toHaveBeenCalledWith(activeCallData.id);
      expect(result).toEqual(expect.any(Object));

      await result.promise;
      expect(store.commit).toHaveBeenCalledWith(SET_CALL_DATA, call);
      expect(twilio.connect).toHaveBeenCalledWith(credentials, expect.any(Object));
    });

    it('should return cancellation methods, and call correct methods when it will be called', async () => {
      const cancellation = jest.fn().mockResolvedValue();
      callsSocket.requestCallback = jest.fn(() => ({
        promise: new Promise(() => {}),
        cancellation,
      }));

      callService.self.setConnectingStatus = jest.fn();
      store.commit = jest.fn();

      const result = callService.callBack();

      expect(callService.self.setConnectingStatus).toHaveBeenCalled();
      expect(callsSocket.requestCallback).toHaveBeenCalledWith(activeCallData.id);
      expect(result).toEqual(expect.any(Object));

      await result.cancellation();
      expect(store.commit).not.toHaveBeenCalled();
      expect(twilio.connect).not.toHaveBeenCalled();

      expect(twilio.disconnect).toHaveBeenCalled();
      expect(cancellation).toHaveBeenCalled();
    });
  });
});
