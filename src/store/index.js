import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import loggedInUser from './loggedInUser';
import storage from './storage';
import tables from './tables';
import call from './call';

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
    call,
  },
  plugins: [persistedStatePlugin],
  strict: debug,
});
