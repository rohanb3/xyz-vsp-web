import store from '@/store';

import { OPERATOR_SOCKET } from '@/constants';
import { REFRESH_TOKEN, UPDATE_TOKEN } from '@/store/loggedInUser/actionTypes';
import { SET_CONNECTION_TO_CALL_SOCKET } from '@/store/call/mutationTypes';

import { ensureSocket, pubSub } from './transport';

const { PUB_SUB_EVENTS, TOKEN_INVALID } = OPERATOR_SOCKET;

init();

function init() {
  pubSub.subscribe(
    PUB_SUB_EVENTS.SOCKET_CONNECTED,
    onEvent.bind(null, PUB_SUB_EVENTS.SOCKET_CONNECTED)
  );
  pubSub.subscribe(
    PUB_SUB_EVENTS.SOCKET_DISCONNECTING,
    onEvent.bind(null, PUB_SUB_EVENTS.SOCKET_DISCONNECTING)
  );
  pubSub.subscribe(
    PUB_SUB_EVENTS.SOCKET_DISCONNECTED,
    onEvent.bind(null, PUB_SUB_EVENTS.SOCKET_DISCONNECTED)
  );
  pubSub.subscribe(
    PUB_SUB_EVENTS.SOCKET_RECONNECTED,
    onEvent.bind(null, PUB_SUB_EVENTS.SOCKET_RECONNECTED)
  );
  pubSub.subscribe(
    PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED,
    onEvent.bind(null, PUB_SUB_EVENTS.SOCKET_AUTHENTIFICATED)
  );
  pubSub.subscribe(
    PUB_SUB_EVENTS.SOCKET_UNAUTHORIZED,
    onEvent.bind(null, PUB_SUB_EVENTS.SOCKET_UNAUTHORIZED)
  );

  pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_CONNECTED, onSocketStatusChanged.bind(null, true));
  pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_DISCONNECTED, onSocketStatusChanged.bind(null, false));
  pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_RECONNECTED, onSocketStatusChanged.bind(null, true));

  pubSub.subscribe(PUB_SUB_EVENTS.SOCKET_UNAUTHORIZED, onUnauthorized);
}

async function onUnauthorized(data) {
  if (data.message === TOKEN_INVALID) {
    await self.refreshToken();

    const credentials = store.getters.vspSocketCredentials;
    if (credentials) {
      await ensureSocket(credentials, true);
    }
  }
}

function onEvent(name, data) {
  console.log('vspSocket.monitor.event', name, data);
}

async function refreshToken() {
  const { data } = await store.dispatch(REFRESH_TOKEN);
  await store.dispatch(UPDATE_TOKEN, {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  });
}

function onSocketStatusChanged(connected) {
  store.commit(SET_CONNECTION_TO_CALL_SOCKET, connected);
}

// Unit-tests purposes
// eslint-disable-next-line import/prefer-default-export
export const self = {
  refreshToken,
};
