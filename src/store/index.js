import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import loggedInUser from './loggedInUser';
import storage from './storage';
import tables from './tables';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const persistedStatePlugin = createPersistedState({
  paths: ['loggedInUser', 'tables'],
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loggedInUser,
    storage,
    tables,
  },
  plugins: [persistedStatePlugin],
  strict: debug,
});
