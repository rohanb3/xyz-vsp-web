import api from './identityApi';

const scope = 'xyzies.authorization.vsp.operator';

export const getProfileData = () => api.get(`/users/profile`).then(({ data }) => data);

export const login = (email, password) =>
  api.post('/api/authorize/token', { username: email, password, scope }).then(response => response);

// eslint-disable-next-line camelcase
export const refreshToken = refresh_token =>
  api.post('/api/authorize/refresh', { refresh_token }).then(response => response);

export const getUser = id => api.get(`/users/${id}`).then(({ data }) => data);
