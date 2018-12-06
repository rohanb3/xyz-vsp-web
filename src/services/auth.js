import api from './api';

export function login(userName, password) {
  return api.post('/login', { userName, password }).then(response => response.data);
}

export const logout = () => {};
