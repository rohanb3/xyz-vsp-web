import api from './api';

export const getCustomers = (startFrom, count) => {
  const params = { startFrom, count };
  return api.get('/customers', { params }).then(({ data }) => data.items);
};

export const getAllCustomersLength = () =>
  api.get('/customers-length').then(({ data }) => data.length);
