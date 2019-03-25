import axios from 'axios';
import api from './identityApi';
/* eslint-disable import/prefer-default-export */
const authEndpoint =
  process.env.NODE_ENV === 'development'
    ? '/token?p=B2C_1_SiIn_ROPC'
    : 'https://ardasdev.b2clogin.com/ardasdev.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_SiIn_ROPC';

export const getProfileData = () => api.get(`/users/profile`).then(({ data }) => data);

export const login = (email, password) => {
  const params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    username: email,
    password,
    grant_type: 'password',
    scope: 'openid https://ardasdev.onmicrosoft.com/api/user_impersonation offline_access',
    response_type: 'id_token',
    client_id: '969c11d1-47ae-4190-bf2e-035563bd9fd8',
  };

  return axios.post(authEndpoint, null, { params }).then(response => response);
};

// eslint-disable-next-line no-shadow
export const refreshToken = refreshToken => {
  const params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: '969c11d1-47ae-4190-bf2e-035563bd9fd8',
  };

  return axios.post(authEndpoint, null, { params }).then(response => response);
};

export const getUser = id => api.get(`/users/${id}`).then(({ data }) => data);
