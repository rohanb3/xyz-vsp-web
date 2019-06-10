import axios from 'axios';

const baseURL = '/api/public-api';

const instance = axios.create({
  baseURL,
});

export default instance;
