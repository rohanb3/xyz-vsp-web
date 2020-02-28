import mutations from '@/store/loggedInUser/mutations';
import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_PROFILE_DATA,
  CLEAR_PROFILE_DATA,
  SET_RESET_TOKEN,
  SET_EMAIL,
} from '@/store/loggedInUser/mutationTypes';

xdescribe('loggedInUser mutations: ', () => {
  xdescribe('SET_PROFILE_DATA: ', () => {
    it('should insert profile', () => {
      const state = {
        profileData: {},
      };

      const expectedProfile = {
        email: 'salesrep@test.com',
        givenName: 'Dima',
        surname: 'Mortyk',
        companyId: 7929,
        avatarUrl: null,
      };

      mutations[SET_PROFILE_DATA](state, expectedProfile);
      expect(state.profileData).toEqual(expectedProfile);
    });
  });

  xdescribe('CLEAR_PROFILE_DATA: ', () => {
    it('should clear profile', () => {
      const state = {
        profileData: {},
      };

      const expectedProfile = {};

      mutations[CLEAR_PROFILE_DATA](state);
      expect(state.profileData).toEqual(expectedProfile);
    });
  });
  xdescribe('SET_TOKEN: ', () => {
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

  xdescribe('REMOVE_TOKEN: ', () => {
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

  xdescribe('SET_RESET_TOKEN: ', () => {
    it('should set reset token', () => {
      const state = {
        resetToken: null,
      };

      const expectedToken = 'wertyeweyt';

      mutations[SET_RESET_TOKEN](state, 'wertyeweyt');
      expect(state.resetToken).toEqual(expectedToken);
    });
  });

  xdescribe('SET_EMAIL: ', () => {
    it('should set email', () => {
      const state = {
        email: null,
      };

      const expectedEmail = 'example@example.com';

      mutations[SET_EMAIL](state, 'example@example.com');
      expect(state.email).toEqual(expectedEmail);
    });
  });
});
