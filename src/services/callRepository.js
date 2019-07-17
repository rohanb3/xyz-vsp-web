import callsApi from '@/services/callsApi';
import { CALL_DISPOSITIONS, CALL_TYPES } from '@/constants';

export const getCalls = filters => {
  const params = { ...filters };
  return callsApi.get('/calls', { params }).then(({ data }) => data);
};

export const getCallsTypes = () =>
  Promise.resovle({
    callTypes: [...CALL_TYPES],
    dispositions: [...CALL_DISPOSITIONS],
  });

export const saveFeedback = data =>
  callsApi.post('/call-feedback-operator', data).then(response => response.data);
