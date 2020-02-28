import store from '@/store';
import { disconnect as disconnectVSPSocket } from '@/services/vspSocket/transport';

import { USER_LOGOUT } from '@/store/loggedInUser/actionTypes';

import api from './api';

export function login(userName, password) {
  return api.post('/login', { userName, password }).then(response => response.data);
}

export const logout = async () => {
  await store.dispatch(USER_LOGOUT);

  disconnectVSPSocket();
};
