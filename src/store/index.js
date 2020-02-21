import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from 'vuex-shared-mutations';

import loggedInUser from './loggedInUser';
import storage from './storage';
import tables from './tables';
import call from './call';
import network from './network';
import realtimeDashboard from './realtimeDashboard';

import { REMOVE_TOKEN } from './loggedInUser/mutationTypes';

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
    tables,
    call,
    network,
    realtimeDashboard,
  },
  plugins: [persistedStatePlugin, createMutationsSharer({ predicate: [REMOVE_TOKEN] })],
  strict: debug,
});
