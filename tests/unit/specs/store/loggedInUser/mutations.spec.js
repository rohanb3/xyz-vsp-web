import mutations from '@/store/loggedInUser/mutations';
import { SET_LOGGED_IN_USER } from '@/store/loggedInUser/mutationTypes';

describe('loggedInUser mutations: ', () => {
  describe('SET_LOGGED_IN_USER: ', () => {
    it('should set logged in user', () => {
      const state = {};
      const user = {
        role: 'Supervisor',
      };

      mutations[SET_LOGGED_IN_USER](state, user);

      expect(state.user).toEqual(user);
    });
  });
});
