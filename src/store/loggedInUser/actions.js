import {
  login,
  refreshToken as refreshTokenApi,
  getProfileData,
} from '@/services/identityRepository';
import { changeProfileData } from '@/services/profile';
import { LOGIN, REFRESH_TOKEN, GET_USER_DATA, CHANGE_USER_DATA } from './actionTypes';
import { SET_TOKEN, SET_USER_DATA } from './mutationTypes';

export default {
  async [GET_USER_DATA]({ commit }) {
    const data = await getProfileData();
    console.log({ data });
    commit(SET_USER_DATA, data);
  },
  async [CHANGE_USER_DATA]({ commit }, data) {
    const response = await changeProfileData(data);
    if (response.status === 'success') {
      commit(SET_USER_DATA, data);
    }
  },
  async [LOGIN]({ commit }, { email, password }) {
    const response = await login(email, password);
    const { access_token: accessToken, refresh_token: refreshToken } = response.data;

    commit(SET_TOKEN, { accessToken, refreshToken });
  },
  async [REFRESH_TOKEN]({ commit, state }) {
    const { refreshToken: currentRefreshToken } = state.token;
    const response = await refreshTokenApi(currentRefreshToken);
    const { access_token: accessToken, refresh_token: refreshToken } = response.data;

    commit(SET_TOKEN, { accessToken, refreshToken });

    return accessToken;
  },
};
