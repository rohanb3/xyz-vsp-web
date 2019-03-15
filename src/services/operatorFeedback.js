import axios from 'axios';
import api from './api';

export const getCallsTypes = () =>
  api.get('/operator-feedback/calls-type').then(response => response.data);

export const saveFeedback = data =>
  axios.post('/call-feedback-operator', data).then(response => response.data);
