import api from '@/services/devicesApi';

export const getDevices = () =>
  api
    .get('/devices')
    .then(({ data }) => ({ data: data.map(d => ({ ...d, history: [] })) }));

export const getDeviceHistory = (id, udid) =>
  api.get(`/devices/${udid}/history/${id}/history`).then(({ data }) => data);
