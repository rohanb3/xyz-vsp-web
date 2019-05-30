import api from '@/services/api';
import callsApi from '@/services/callsApi';

export const getCalls = filters => {
  const params = { ...filters };
  return callsApi.get('/calls', { params }).then(({ data }) => data);
};

export const getCallsTypes = () =>
  api.get('/operator-feedback/calls-type').then(response => response.data);

export const saveFeedback = data =>
  callsApi.post('/call-feedback-operator', data).then(response => response.data);
