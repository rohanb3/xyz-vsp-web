/* eslint-disable import/prefer-default-export */

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-ardas-xyz-vsp.cloudfunctions.net/api/v1',
});

export const login = async (userName, password) => {
  try {
    const response = await api.post('/login', { userName, password });
    return response.data;
  } catch (e) {
    return e;
  }
};
