/* eslint-disable no-use-before-define, import/prefer-default-export */

import store from '@/store';
import {
  SET_CALL_STATUS,
  SET_CALL_TOKEN,
  SET_CALL_DATA,
  SET_PENDING_CALLS_INFO,
} from '@/store/call/mutationTypes';
import { callStatuses } from '@/store/call/constants';
import {
  init as initiOperatorSocker,
  notifyAboutAcceptingCall,
  notifyAboutFinishingCall,
  notifyAboutLeavingRoomEmpty,
  requestCallback,
  disconnect as disconnectFromSocket,
} from '@/services/operatorSocket';
import { connect as connectToRoom, disconnect as disconnectFromRoom } from '@/services/twilio';
import api from '@/services/api';

export function initializeOperator() {
  const userName = store.state.loggedInUser.user.name;
  const credentials = { userName };
  return initiOperatorSocker(credentials, checkCallsInfoAndHandleCallStatus).then(setToken);
}

export function disconnectOperator() {
  disconnectFromRoom();
  disconnectFromSocket();
  return Promise.resolve();
}

export function acceptCall() {
  setConnectingStatus();

  return notifyAboutAcceptingCall()
    .then(call => {
      const credentials = { name: call.id, token: store.state.call.token };
      const roomHandlers = {
        onRoomEmptied,
      };
      store.commit(SET_CALL_DATA, call);
      return connectToRoom(credentials, roomHandlers);
    })
    .then(setActiveCallStatus);
}

export function finishCall() {
  const { activeCallData } = store.getters;
  notifyAboutFinishingCall(activeCallData);
  disconnectFromRoom();
  setFinishedCallStatus();
  return Promise.resolve();
}

export function callBack() {
  const { activeCallData } = store.getters;
  return requestCallback(activeCallData.id)
    .then(call => {
      const credentials = { name: call.id, token: store.state.call.token };
      const roomHandlers = {
        onRoomEmptied,
      };
      setConnectingStatus();
      store.commit(SET_CALL_DATA, call);
      return connectToRoom(credentials, roomHandlers);
    })
    .then(setActiveCallStatus);
}

// private methods

function onRoomEmptied() {
  notifyAboutLeavingRoomEmpty();
  setFinishedCallStatus();
}

// store actors

function checkCallsInfoAndHandleCallStatus(data) {
  if (!data.size) {
    store.commit(SET_CALL_STATUS, callStatuses.IDLE);
  } else if (store.getters.isOperatorIdle) {
    store.commit(SET_CALL_STATUS, callStatuses.INCOMING);
  }
  store.commit(SET_PENDING_CALLS_INFO, data);
}

function setConnectingStatus() {
  store.commit(SET_CALL_STATUS, callStatuses.CONNECTING);
}

function setIdleCallStatus() {
  store.commit(SET_CALL_STATUS, callStatuses.IDLE);
}

function setActiveCallStatus(room) {
  store.commit(SET_CALL_STATUS, callStatuses.ACTIVE);
  store.commit(SET_CALL_DATA, {
    sid: room.sid,
    roomId: room.name,
  });
}

function setFinishedCallStatus() {
  store.commit(SET_CALL_STATUS, callStatuses.FINISHED);
}

function setToken(token) {
  store.commit(SET_CALL_TOKEN, token);
}

export const getCallInfo = () => api.get('/call/info').then(response => response.data);
