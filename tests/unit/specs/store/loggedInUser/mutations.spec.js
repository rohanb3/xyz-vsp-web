import mutations from '@/store/loggedInUser/mutations';
import { SET_TOKEN, REMOVE_TOKEN } from '@/store/loggedInUser/mutationTypes';

describe('loggedInUser mutations: ', () => {
  describe('SET_TOKEN: ', () => {
    it('should set token', () => {
      const state = {
        token: null,
      };
      const token = {
        accessToken: 'newToken123',
        refreshToken: '123',
      };

      mutations[SET_TOKEN](state, token);
      expect(state.token).toEqual(token);
    });
  });

  describe('REMOVE_TOKEN: ', () => {
    it('should reset token', () => {
      const state = {
        token: {
          accessToken: '123',
          refreshToken: '2323',
        },
      };

      const expectedToken = null;

      mutations[REMOVE_TOKEN](state);
      expect(state.token).toEqual(expectedToken);
    });
  });
});
