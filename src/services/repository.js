/* eslint-disable import/prefer-default-export */

import axios from 'axios';

export const login = (userName, password) => axios.post('/api/login', { userName, password });
