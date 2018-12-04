import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import loggedInUser from './loggedInUser';
import storage from './storage';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const persistedStatePlugin = createPersistedState({
  paths: ['loggedInUser'],
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loggedInUser,
    storage,
  },
  plugins: [persistedStatePlugin],
  strict: debug,
});
