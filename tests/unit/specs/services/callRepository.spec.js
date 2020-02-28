import api from '@/services/callsApi';
import { getCalls, getCallsTypes, saveFeedback } from '@/services/callRepository';
import { CALL_DISPOSITIONS, CALL_TYPES } from '@/constants';

xdescribe('callRepository', () => {
  xdescribe('getCalls', () => {
    it('should call api get with params', async () => {
      const params = {
        direction: 'desc',
      };

      const data = {
        id: 1,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      await getCalls(params);

      expect(api.get).toHaveBeenCalledWith('/calls', { params });
    });
  });
  xdescribe('getCallsTypes', () => {
    it('should return data', () => {
      const expectedResult = Promise.resolve({
        callTypes: [...CALL_TYPES],
        dispositions: [...CALL_DISPOSITIONS],
      });

      const result = getCallsTypes();

      expect(result).toEqual(expectedResult);
    });
  });
  xdescribe('saveFeedback', () => {
    it('should call api.post and return data', async () => {
      const data = {
        rating: 5,
      };

      api.post = jest.fn(() => Promise.resolve({ data }));

      const result = await saveFeedback(data);

      expect(api.post).toHaveBeenCalledWith('/call-feedback-operator', data);
      expect(result).toEqual(data);
    });
  });
});
