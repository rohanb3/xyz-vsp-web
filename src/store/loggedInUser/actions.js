import { login } from '@/services/auth';
import { getProfileData, changeProfileData } from '@/services/profile';
import { LOG_IN_USER, GET_USER_DATA, CHANGE_USER_DATA } from './actionTypes';
import { SET_LOGGED_IN_USER, SET_USER_DATA } from './mutationTypes';

export default {
  async [LOG_IN_USER]({ commit }, { userName, password }) {
    commit(SET_LOGGED_IN_USER, await login(userName, password));
  },
  async [GET_USER_DATA]({ commit }) {
    commit(SET_USER_DATA, await getProfileData());
  },
  async [CHANGE_USER_DATA]({ commit }, data) {
    const response = await changeProfileData(data);
    if (response.status === 'success') {
      commit(SET_USER_DATA, data);
    }
  },
};
