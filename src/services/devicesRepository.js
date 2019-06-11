import api from '@/services/devicesApi';

export const getDevices = () => api.get('/devices');

export const getDeviceHistory = ({ deviceId, ...filters } = {}) => {
  const params = { ...filters };
  return deviceId
    ? api
        .get(`/devices/${deviceId}/history`, { params })
        .then(({ data: { result: data, ...rest } }) => ({ data, ...rest }))
    : Promise.resolve({ data: [], count: 0 });
};

export const createDevice = params => api.post('/devices', params).then(({ data }) => data);

export const updateDevice = (id, params) =>
  api.put(`/devices/${id}`, params).then(({ data }) => data);
