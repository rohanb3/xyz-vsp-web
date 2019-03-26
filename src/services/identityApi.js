import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://dev-demo.xyzies.ardas.biz/api/identity'
    : '/api/identity';

const instance = axios.create({
  baseURL,
});

export default instance;
