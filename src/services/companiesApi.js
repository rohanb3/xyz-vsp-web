import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/reviews/api/companies',
});

export default instance;
