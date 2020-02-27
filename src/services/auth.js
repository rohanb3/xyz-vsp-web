import store from '@/store';
import { disconnect as disconnectVSPSocket } from '@/services/vspSocket/transport';

import { REMOVE_TOKEN, CLEAR_PROFILE_DATA } from '@/store/loggedInUser/mutationTypes';

import api from './api';

export function login(userName, password) {
  return api.post('/login', { userName, password }).then(response => response.data);
}

export const logout = () => {
  store.commit(REMOVE_TOKEN);
  store.commit(CLEAR_PROFILE_DATA);

  disconnectVSPSocket();
};
