import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    profileData: {},
    token: null,
    email: null,
    resetToken: null,
  },
  getters,
  actions,
  mutations,
};
