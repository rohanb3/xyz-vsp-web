import {
  GET_PROFILE_DATA,
  LOGIN,
  REFRESH_TOKEN,
  GET_PHOTO,
  GET_RESET_TOKEN,
  USER_LOGOUT,
} from './actionTypes';

import {
  SET_PROFILE_DATA,
  SET_TOKEN,
  SET_RESET_TOKEN,
  REMOVE_TOKEN,
  CLEAR_PROFILE_DATA,
  SET_PROMISE_REFRESH_TOKEN,
} from './mutationTypes';

import {
  getProfileData,
  login,
  getAvatar,
  refreshToken as refreshTokenApi,
  verifyCode,
} from '@/services/identityRepository';

export default {
  async [GET_PROFILE_DATA]({ commit }) {
    const profileData = await getProfileData();
    commit(SET_PROFILE_DATA, profileData);
  },
  async [LOGIN]({ commit }, { email, password }) {
    const emailLowerCase = email.toLowerCase();
    const { data } = await login(emailLowerCase, password);
    const { access_token: accessToken, refresh_token: refreshToken } = data;
    commit(SET_TOKEN, { accessToken, refreshToken });
  },
  async [REFRESH_TOKEN]({ commit, state }) {
    const { refreshToken: currentRefreshToken } = state.token;
    if (!(state.refreshTokenPromise instanceof Promise)) {
      commit(SET_PROMISE_REFRESH_TOKEN, refreshTokenApi(currentRefreshToken));
    }
    return state.refreshTokenPromise;
  },
  async [GET_PHOTO]({ commit, state }) {
    const { data: avatarBase64Url } = await getAvatar(state.profileData.objectId);
    commit(SET_PROFILE_DATA, {
      ...state.profileData,
      avatarLink: avatarBase64Url,
    });
  },
  async [GET_RESET_TOKEN]({ commit }, { email, code }) {
    const {
      data: { resetToken },
    } = await verifyCode(email, code);
    commit(SET_RESET_TOKEN, resetToken);
  },
  [USER_LOGOUT]({ commit }) {
    commit(REMOVE_TOKEN);
    commit(CLEAR_PROFILE_DATA);
  },
};
