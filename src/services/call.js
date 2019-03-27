/* eslint-disable no-use-before-define, import/prefer-default-export */

import store from '@/store';
import {
  SET_OPERATOR_STATUS,
  SET_CALL_TOKEN,
  SET_CALL_DATA,
  SET_PENDING_CALLS_INFO,
} from '@/store/call/mutationTypes';
import { operatorStatuses } from '@/store/call/constants';
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

import { handleUpdateCallsInfo } from '@/services/callNotifications';

export function initializeOperator() {
  const userName = store.state.loggedInUser.user.name;
  const credentials = { userName };
  return initiOperatorSocker(credentials, checkAndUpdateCallsInfo).then(setToken);
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
    .then(setOnCallOperatorStatus);
}

export function finishCall() {
  const { activeCallData } = store.getters;
  notifyAboutFinishingCall(activeCallData);
  disconnectFromRoom();
  setFinishedCallOperatorStatus();
  return Promise.resolve();
}

export function callBack() {
  const { activeCallData } = store.getters;
  setConnectingStatus();
  return requestCallback(activeCallData.id)
    .then(call => {
      const credentials = { name: call.id, token: store.state.call.token };
      const roomHandlers = {
        onRoomEmptied,
      };
      store.commit(SET_CALL_DATA, call);
      return connectToRoom(credentials, roomHandlers);
    })
    .then(setOnCallOperatorStatus);
}

// private methods

function onRoomEmptied() {
  notifyAboutLeavingRoomEmpty();
  setFinishedCallOperatorStatus();
}

// store actors

function checkAndUpdateCallsInfo(data) {
  store.commit(SET_PENDING_CALLS_INFO, data);
  handleUpdateCallsInfo(data);
}

function setConnectingStatus() {
  store.commit(SET_OPERATOR_STATUS, operatorStatuses.CONNECTING_TO_CALL);
}

function setOnCallOperatorStatus(room) {
  store.commit(SET_OPERATOR_STATUS, operatorStatuses.ON_CALL);
  store.commit(SET_CALL_DATA, {
    sid: room.sid,
    roomId: room.name,
  });
}

function setFinishedCallOperatorStatus() {
  store.commit(SET_OPERATOR_STATUS, operatorStatuses.FINISHED_CALL);
}

function setToken(token) {
  store.commit(SET_CALL_TOKEN, token);
}

export const getCallInfo = () => api.get('/call/info').then(response => response.data);
