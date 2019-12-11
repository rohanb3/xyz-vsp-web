import axios from 'axios';
import store from '@/store';
import debounce from 'lodash.debounce';
import { REFRESH_TOKEN, USER_LOGOUT, UPDATE_TOKEN } from '@/store/loggedInUser/actionTypes';
import { RESPONSE_STATUSES, ROUTE_NAMES } from '@/constants';

const INVALID_TOKEN = 'invalid_token';
const SET_TOKEN_TIMEOUT = 500;

function requestInterceptor(request) {
  const { token } = store.state.loggedInUser;

  if (!request.disableAuthHeader && token) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${token.accessToken}`,
    };
  }
  return request;
}

function isUnauthorized(status, header) {
  return status === RESPONSE_STATUSES.UNAUTHORIZED && header.includes(INVALID_TOKEN);
}

function setToken(accessToken, refreshToken) {
  store.dispatch(UPDATE_TOKEN, { accessToken, refreshToken });
}

const debounceSetToken = debounce(setToken, SET_TOKEN_TIMEOUT);

async function errorResponseInterceptor(error, router) {
  const isTokenExpired =
    error.response &&
    isUnauthorized(error.response.status, error.response.headers['www-authenticate']);
  if (isTokenExpired) {
    try {
      const { data: result } = await store.dispatch(REFRESH_TOKEN);

      const { access_token: accessToken, refresh_token: refreshToken } = result;

      debounceSetToken(accessToken, refreshToken);

      const { headers } = error.config;
      headers.Authorization = `Bearer ${accessToken}`;

      return axios.request({
        ...error.config,
        url: error.config.url.replace(error.config.baseURL, ''),
        ...headers,
      });
    } catch {
      await store.dispatch(USER_LOGOUT);
      router.push({ name: ROUTE_NAMES.LOGIN });
    }
  }
  throw error;
}

export default function interceptors(instance, router) {
  instance.interceptors.request.use(request => requestInterceptor(request, router));
  instance.interceptors.response.use(
    response => response,
    error => errorResponseInterceptor(error, router)
  );
}
