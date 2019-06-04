import axios from 'axios';

export default axios.create({
  baseURL: '/api/device-management-api',
});
