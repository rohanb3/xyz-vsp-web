/* eslint-disable import/prefer-default-export */
import api from '@/services/devicesApi';

export const getDevices = () => api.get('/devices').then(({ data }) => ({ data }));

export const getCommentByDevice = params =>
  api
    .get(`/devices/${params.id}/comments`)
    .then(({ data }) => ({ data: data.result, count: data.total }));

export const submitComment = (id, comment) =>
  api
    .post(`/devices/${id}/comments`, comment, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => ({ data }));
