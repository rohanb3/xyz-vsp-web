/* eslint-disable no-use-before-define, import/prefer-default-export */

import store from '@/store';
import { SET_CALL_STATUS, SET_CALL_TOKEN } from '@/store/call/mutationTypes';
import { callStatuses } from '@/store/call/constants';
import {
  init as initiOperatorSocker,
  notifyAboutAcceptingCall,
  notiyAboutFinishingCall,
  notifyAboutLeavingRoomEmpty,
  disconnect as disconnectFromSocket,
} from '@/services/operatorSocket';
import { connect as connectToRoom, disconnect as disconnectFromRoom } from '@/services/twilio';
import api from '@/services/api';

export function initializeOperator() {
  const userName = store.state.loggedInUser.user.name;
  const credentials = { userName };
  return initiOperatorSocker(credentials, checkAndSetIncomingCallStatus).then(setToken);
}

export function disconnectOperator() {
  disconnectFromRoom();
  disconnectFromSocket();
  return Promise.resolve();
}

export function acceptCall() {
  setConnectingStatus();

  return notifyAboutAcceptingCall()
    .then(name => {
      const credentials = { name, token: store.state.call.token };
      const roomHandlers = {
        onRoomEmptied,
      };
      return connectToRoom(credentials, roomHandlers);
    })
    .then(setActiveCallStatus);
}

export function finishCall() {
  notiyAboutFinishingCall();
  disconnectFromRoom();
  setIdleCallStatus();
  return Promise.resolve();
}

// private methods

function onRoomEmptied() {
  notifyAboutLeavingRoomEmpty();
  setIdleCallStatus();
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

export const getCallInfo = () => api.get('/call/info').then(response => response.data);
export const callBack = () => api.get('/call').then(response => response.data);
