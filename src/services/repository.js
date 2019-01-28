import api from './api';

export const getCustomers = (startFrom, count) => {
  const params = { startFrom, count };
  return api.get('/customers', { params }).then(({ data }) => data.items);
};

export const getAllCustomersLength = () =>
  api.get('/customers-length').then(({ data }) => data.length);

export const getCalls = (startFrom, count) => {
  const params = { startFrom, count };
  return api.get('/calls', { params }).then(({ data }) => data.items);
};

export const getAllCallsLength = () => api.get('/calls-length').then(({ data }) => data.length);

export const getAudioBuffer = url =>
  api.get(url, { responseType: 'arraybuffer' }).then(response => response.data);

export const getOperators = (startFrom, count) => {
  const params = { startFrom, count };
  return api.get('/operators', { params }).then(({ data }) => data.items);
};

export const getAllOperatorsLength = () =>
  api.get('/operators-length').then(({ data }) => data.length);

export const getOperatorReview = () =>
  api.get('/operator-review').then(response => response.data.items);

export const getCallsDuration = () => api.get('/calls-duration').then(({ data }) => data.items);
