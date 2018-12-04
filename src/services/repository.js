/* eslint-disable import/prefer-default-export */

import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

export const login = async (userName, password) => {
  try {
    const response = await api.post('/login', { userName, password });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const getCustomers = (startFrom, count) => {
  const params = { startFrom, count };
  return api.get('/customers', { params }).then(({ data }) => data.items);
};

export const getAllCustomersLength = () =>
  api.get('/customers-length').then(({ data }) => data.length);

export const logout = () => {};
