import api from './api';

export const getCallInfo = () => api.get('/call/info').then(response => response.data);
export const callBack = () => api.get('/call').then(response => response.data);
