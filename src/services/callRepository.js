import callsApi from '@/services/callsApi';
import { DISPOSITIONS } from '@/constants';

export const getCalls = filters => {
  const params = { ...filters };
  return callsApi.get('/calls', { params }).then(({ data }) => data);
};

export const getCallsTypes = () =>
  Promise.resovle({
    callTypes: ['info', 'help', 'sale'],
    dispositions: [...DISPOSITIONS],
  });

export const saveFeedback = data =>
  callsApi.post('/call-feedback-operator', data).then(response => response.data);
