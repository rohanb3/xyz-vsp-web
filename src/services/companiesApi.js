import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/public-api/company',
});

export default instance;
