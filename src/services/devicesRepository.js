/* eslint-disable import/prefer-default-export */
import api from '@/services/devicesApi';

export const getDevices = () => api.get('/devices').then(({ data }) => ({ data }));
