/* eslint-disable import/prefer-default-export */

import axios from 'axios';

export const login = async (userName, password) => {
  try {
    const response = await axios.post('/api/login', { userName, password });
    return response.data;
  } catch (e) {
    return e;
  }
};
