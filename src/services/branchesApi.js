import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/public-api/branch/',
});

export default instance;
