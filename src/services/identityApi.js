import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'https://api.identity.ardas.biz/api' : '/api/identity';

const instance = axios.create({
  baseURL,
});

export default instance;
