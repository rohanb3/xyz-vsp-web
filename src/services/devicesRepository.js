import api from '@/services/devicesApi';

export const getDevices = () =>
  api.get('/devices').then(({ data }) => ({ data: data.map(d => ({ ...d, history: [] })) }));

export const getDeviceHistory = ({ deviceId, ...filters }) => {
  const params = { ...filters };
  return deviceId
    ? api
        .get(`/devices/${deviceId}/history`, { params })
        .then(({ data: { result: data, ...rest } }) => ({ data, ...rest }))
    : Promise.resolve({ data: [], count: 0 });
};
