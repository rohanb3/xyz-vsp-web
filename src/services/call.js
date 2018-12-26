/* eslint-disable no-use-before-define, import/prefer-default-export */

import store from '@/store';
import router from '@/router';
import { SET_CALL_STATUS, SET_TOKEN } from '@/store/call/mutationTypes';
import { callStatuses } from '@/store/call/constants';
import {
  initSocket,
  acceptCall,
  declineCall,
  notifyPeerAboutJoiningRoom,
  events as socketEvents,
} from '@/services/operatorSocket';
import { initTwilio, connectToRoom } from '@/services/twilio';

let acceptCallUnwatch = null;

const mediaSelectors = {
  local: '#localMedia',
  remote: '#remoteMedia',
};

export function initializeOperator(authData) {
  const socketListeners = {
    [socketEvents.INCOMING_CALL]: onIncomingCall,
    [socketEvents.ROOM_CREATED]: onRoomCreated,
    [socketEvents.AUTHENTICATED]: setToken,
  };

  initSocket(authData, socketListeners);
  initTwilio(mediaSelectors);
}

function onIncomingCall() {
  if (acceptCallUnwatch) {
    acceptCallUnwatch();
  }
  return notifyUserAboutIncomingCall()
    .then(acceptCall)
    .catch(declineCall);
}

function onRoomCreated(roomName) {
  return goToCallScreen()
    .then(() => connectToRoom(roomName, store.state.call.token))
    .then(() => onRoomConnected(roomName));
}

function notifyUserAboutIncomingCall() {
  setIncomingCallStatus();

  return new Promise((resolve, reject) => {
    acceptCallUnwatch = store.watch(
      state => state.call.callStatus,
      value => {
        acceptCallUnwatch();
        acceptCallUnwatch = null;
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
  notifyPeerAboutJoiningRoom(roomName);
}

// router actors

function goToCallScreen() {
  router.push({ name: 'call' });
  return new Promise(setTimeout);
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
