import axios from 'axios';

const baseURL = 'https://portal.xyzreviews.com/api/identity/api';

const instance = axios.create({
  baseURL,
});

export default instance;
