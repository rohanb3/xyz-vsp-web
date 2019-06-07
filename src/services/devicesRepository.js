/* eslint-disable import/prefer-default-export */
import api from '@/services/devicesApi';

export const getDevices = () => api.get('/devices').then(({ data }) => ({ data }));

export const createDevice = params => api.post('/devices', params).then(({ data }) => data);
