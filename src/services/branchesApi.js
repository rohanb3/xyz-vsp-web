import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/reviews/api/branches/',
});

export default instance;
