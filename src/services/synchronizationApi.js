import axios from 'axios';

const baseURL = '/api/identity/api';

const api = axios.create({
  baseURL,
});

export default api;
