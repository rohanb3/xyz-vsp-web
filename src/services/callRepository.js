import api from '@/services/api';
import callApi from '@/services/callApi';

export const getCallsTypes = () =>
  api.get('/operator-feedback/calls-type').then(response => response.data);

export const saveFeedback = data =>
  callApi.post('/call-feedback-operator', data).then(response => response.data);
