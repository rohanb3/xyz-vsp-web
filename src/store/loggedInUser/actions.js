import {
  login,
  refreshToken as refreshTokenApi,
  getProfileData,
  getAvatar,
  verifyCode,
} from '@/services/identityRepository';
import { changeProfileData } from '@/services/profile';
import {
  LOGIN,
  REFRESH_TOKEN,
  GET_PROFILE_DATA,
  CHANGE_PROFILE_DATA,
  GET_PHOTO,
  GET_RESET_TOKEN,
} from './actionTypes';
import { SET_TOKEN, SET_PROFILE_DATA, SET_RESET_TOKEN } from './mutationTypes';
import { STATUS_OK } from '@/constants/responseStatuses';

export default {
  async [GET_PROFILE_DATA]({ commit }) {
    const data = await getProfileData();
    commit(SET_PROFILE_DATA, data);
  },
  async [CHANGE_PROFILE_DATA]({ commit }, data) {
    const response = await changeProfileData(data);
    if (response.status === 'success') {
      commit(SET_PROFILE_DATA, data);
    }
  },
  async [LOGIN]({ commit }, { email, password }) {
    const emailLowerCase = email.toLowerCase();
    const response = await login(emailLowerCase, password);
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
  async [GET_PHOTO]({ commit, state }) {
    const { status, data: avatarBase64Url } = await getAvatar(state.profileData.objectId);
    if (status === STATUS_OK) {
      commit(SET_PROFILE_DATA, { ...state.profileData, avatarLink: avatarBase64Url });
    } else {
      throw new Error();
    }
  },
  async [GET_RESET_TOKEN]({ commit }, { email, code }) {
    const { status, data } = await verifyCode(email, code);
    if (status === STATUS_OK) {
      commit(SET_RESET_TOKEN, data.resetToken);
      return status;
    }
    throw new Error();
  },
};
