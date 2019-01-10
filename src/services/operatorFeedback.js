import api from './api';

export const getCallsTypes = () =>
  api.get('/operator-feedback/calls-type').then(response => response.data);

export const saveFeedback = data =>
  api.post('/operator-feedback', data).then(response => response.data);
