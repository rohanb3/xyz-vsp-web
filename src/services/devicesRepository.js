import api from '@/services/devicesApi';
import { paramsSerializer } from '@/services/repositoryUtils';

export const getDevices = filters => {
  const params = { ...filters };
  api
    .get('/devices', { params, paramsSerializer })
    .then(({ data }) => ({ data: data.result, count: data.total }));
};

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

export const getCommentByDevice = ({ id, ...filters }) => {
  const params = { ...filters };

  return id
    ? api
        .get(`/devices/${id}/comments`, { params })
        .then(({ data }) => ({ data: data.result, count: data.total }))
    : Promise.resolve({ data: [], count: 0 });
};

export const submitComment = (id, comment) =>
  api
    .post(`/devices/${id}/comments`, comment, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(data => data);
