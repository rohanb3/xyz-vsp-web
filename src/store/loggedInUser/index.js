import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  token: null,
  profileData: {},
  email: null,
  resetToken: null,
  refreshTokenPromise: null,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
