/* eslint-disable no-use-before-define, import/prefer-default-export */

import store from '@/store';
import { SET_CALL_STATUS, SET_CALL_TOKEN } from '@/store/call/mutationTypes';
import { callStatuses } from '@/store/call/constants';
import {
  authenticate,
  initImcomingCallsListening,
  notifyAboutAcceptingCall,
  notifyAboutJoiningRoom,
  notiyAboutFinishingCall,
} from '@/services/operatorSocket';
import { connectToRoom, disconnectFromRoom } from '@/services/twilio';

export function initializeOperator() {
  const userName = store.state.loggedInUser.user.name;
  const user = { userName };
  return authenticate({ user })
    .then(setToken)
    .then(() => initImcomingCallsListening(checkAndSetIncomingCallStatus));
}

export function acceptCall() {
  setConnectingStatus();

  return notifyAboutAcceptingCall()
    .then(roomName => connectToRoom(roomName, store.state.call.token))
    .then(notifyAboutJoiningRoom);
}

export function makeCallActive() {
  setActiveCallStatus();
}

export function finishCall() {
  notiyAboutFinishingCall();
  disconnectFromRoom();
  setIdleCallStatus();
  return Promise.resolve();
}

export function disconnect() {
  disconnectFromRoom();
}

// store actors

function checkAndSetIncomingCallStatus() {
  if (store.getters.isOperatorIdle) {
    store.commit(SET_CALL_STATUS, callStatuses.INCOMING);
  }
}

function setConnectingStatus() {
  store.commit(SET_CALL_STATUS, callStatuses.CONNECTING);
}

function setIdleCallStatus() {
  store.commit(SET_CALL_STATUS, callStatuses.IDLE);
}

function setActiveCallStatus() {
  store.commit(SET_CALL_STATUS, callStatuses.ACTIVE);
}

function setToken(token) {
  store.commit(SET_CALL_TOKEN, token);
}
