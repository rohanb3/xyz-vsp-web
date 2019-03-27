/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '@/store';
import { REFRESH_TOKEN } from '@/store/loggedInUser/actionTypes';

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

async function errorResponseInterceptor(data, router) {
  if (
    data.response.status === 401 &&
    data.response.headers['www-authenticate'] ===
      'Bearer error="invalid_token", error_description="The token is expired"'
  ) {
    try {
      await store.dispatch(REFRESH_TOKEN);
      axios.request({ ...data.config, url: data.config.url.replace(data.config.baseURL, '') });
    } catch (e) {
      router.push({ path: 'login' });
    }
  }
  return data;
}

export default function interceptors(instance, router) {
  instance.interceptors.request.use(request => requestInterceptor(request, router));
  instance.interceptors.response.use(
    response => response,
    error => errorResponseInterceptor(error, router)
  );
}
