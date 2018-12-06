import { login } from '@/services/auth';
import { LOG_IN_USER } from './actionTypes';
import { SET_LOGGED_IN_USER } from './mutationTypes';

export default {
  async [LOG_IN_USER]({ commit }, { userName, password }) {
    commit(SET_LOGGED_IN_USER, await login(userName, password));
  },
};
