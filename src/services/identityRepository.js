import api from './identityApi';
import { imageEncode } from '@/services/utils';

const scope = 'xyzies.authorization.vsp.web';

export const getProfileData = () => api.get(`/users/profile`).then(({ data }) => data);

export const login = (email, password) =>
  api.post('/authorize/token', { username: email, password, scope }).then(response => response);

// eslint-disable-next-line camelcase
export const refreshToken = refresh_token =>
  api.post('/authorize/refresh', { refresh_token }).then(response => response);

export const getUser = id => api.get(`/users/${id}`).then(({ data }) => data);
export const getAvatar = id =>
  api
    .get(`/users/${id}/avatar`, { responseType: 'arraybuffer' })
    .then(({ status, data }) => ({ status, data: imageEncode(data) }));

export const requestVerificationCode = email =>
  api.post('/authorize/request-verification-code', { email }).then(({ status }) => status);

export const verifyCode = (email, code) =>
  api.post('/authorize/verify-code', { email, code }).then(response => response);

export const resetPassword = (resetToken, password) =>
  api.post('/authorize/reset-password', { resetToken, password }).then(response => response);
