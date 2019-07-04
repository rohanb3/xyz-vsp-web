import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/reviews/api/location',
});

export default instance;
