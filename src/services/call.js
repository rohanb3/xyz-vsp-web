/* eslint-disable no-use-before-define, import/prefer-default-export */

import store from '@/store';
import router from '@/router';
import { SET_CALL_STATUS, SET_TOKEN } from '@/store/call/mutationTypes';
import { callStatuses } from '@/store/call/constants';
import {
  initSocket,
  // listenIncomingCall,
  acceptCall,
  notifyPeerAboutJoiningRoom,
  // getToken,
  // listenRoomCreation,
  events as socketEvents,
} from '@/services/operatorSocket';
import { connectToRoom } from '@/services/twilio';

export const events = {
  ...socketEvents,
};

export function initializeOperator(authData) {
  const subscribers = {
    [socketEvents.INCOMING_CALL]: onIncomingCall,
    [socketEvents.ROOM_CREATED]: onRoomCreated,
    [socketEvents.AUTHENTICATED]: setToken,
  };
  // listenIncomingCall(onIncomingCall);
  // listenRoomCreation(onRoomCreated);
  // getToken(setToken);
  initSocket(authData, subscribers);
}

function onIncomingCall(customerId) {
  return notifyUserAboutIncomingCall()
    .then(() =>
      acceptCall({
        query: {
          customerId,
        },
      })
    )
    .catch(console.error);
}

function onRoomCreated(roomName) {
  return connectToRoom(roomName, store.state.call.token).then(() => onRoomConnected(roomName));
}

function notifyUserAboutIncomingCall() {
  setIncomingCallStatus();

  return new Promise((resolve, reject) => {
    const unwatch = store.watch(
      state => state.call.callStatus,
      value => {
        unwatch();
        if (value === callStatuses.ACCEPTED) {
          resolve();
        } else {
          reject();
        }
      }
    );
  });
}

function onRoomConnected(roomName) {
  setWaitingForPeerStatus();
  goToCallScreen();
  notifyPeerAboutJoiningRoom(roomName);
}

// router actors

function goToCallScreen() {
  router.push({ name: 'call' });
}

// store actors

function setIncomingCallStatus() {
  store.commit(SET_CALL_STATUS, callStatuses.INCOMING);
}

function setWaitingForPeerStatus() {
  store.commit(SET_CALL_STATUS, callStatuses.WAITING_FOR_PEER);
}

function setToken(token) {
  store.commit(SET_TOKEN, token);
}
