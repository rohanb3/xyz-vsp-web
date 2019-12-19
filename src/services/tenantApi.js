import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/public-api/tenant',
});

export default instance;
