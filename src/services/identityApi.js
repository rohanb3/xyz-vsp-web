import axios from 'axios';

const baseURL = '/api/identity/api';

const instance = axios.create({
  baseURL,
});

export default instance;
