/* eslint-disable no-use-before-define, import/prefer-default-export */

import store from '@/store';
import {
  SET_OPERATOR_STATUS,
  SET_CALL_TOKEN,
  SET_CALL_DATA,
  SET_CONNECTION_TO_CALL_SOCKET,
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
  notifyAboutChangingStatusToOnline,
  notifyAboutChangingStatusToOffline,
  listenToCallFinishing,
} from '@/services/operatorSocket';
import { connect as connectToRoom, disconnect as disconnectFromRoom } from '@/services/twilio';
import { VIDEO } from '@/constants/twilio';
import { errorMessages as socketErrors } from '@/constants/operatorSocket';
import api from '@/services/api';

import { handleUpdateCallsInfo } from '@/services/callNotifications';
import { checkAndRequestCallPermissions } from '@/services/callPermissions';

export const errors = {
  ...socketErrors,
};

export function initializeOperator() {
  return checkAndRequestCallPermissions().then(() => {
    const identity = store.getters.userId;
    const credentials = { identity };
    return initiOperatorSocker(credentials, checkAndUpdateCallsInfo, setConnectedToSocket);
  });
}

export function disconnectOperator() {
  disconnectFromRoom();
  disconnectFromSocket();
  return Promise.resolve();
}

export function acceptCall() {
  setConnectingStatus();

  const roomConnectionPromise = notifyAboutAcceptingCall().then(({ token, ...call }) => {
    const credentials = { name: call.id, token };
    const handlers = {
      onRoomEmptied,
    };
    const media = { [VIDEO]: true };
    store.commit(SET_CALL_DATA, call);
    setToken(token);
    return connectToRoom(credentials, { media, handlers });
  });
  const callFinishingPromise = listenToCallFinishing();

  return Promise.race([roomConnectionPromise, callFinishingPromise])
    .then(setOnCallOperatorStatus)
    .catch(onCallAcceptingFailed);
}

export function reconnect() {
  const { token, activeCallData } = store.state.call;
  const credentials = {
    name: activeCallData.id,
    token,
  };
  const handlers = {
    onRoomEmptied,
  };
  const media = { [VIDEO]: true };
  return connectToRoom(credentials, { media, handlers });
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
      const handlers = {
        onRoomEmptied,
      };
      store.commit(SET_CALL_DATA, call);
      return connectToRoom(credentials, { handlers });
    })
    .then(setOnCallOperatorStatus);
}

export function setOnlineStatus() {
  notifyAboutChangingStatusToOnline();
  store.commit(SET_OPERATOR_STATUS, operatorStatuses.IDLE);
}

export function setOfflineStatus() {
  notifyAboutChangingStatusToOffline();
  store.commit(SET_OPERATOR_STATUS, operatorStatuses.OFFLINE);
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

function setConnectedToSocket(connected) {
  store.commit(SET_CONNECTION_TO_CALL_SOCKET, connected);
}

function onCallAcceptingFailed(err) {
  disconnectFromRoom();
  if (err.message === socketErrors.CALLS_EMPTY) {
    return Promise.reject(new Error(errors.CALLS_EMPTY));
  }
  if (err.message === socketErrors.CALL_ACCEPTING_FAILED) {
    return Promise.reject(new Error(errors.CALL_ACCEPTING_FAILED));
  }
  return Promise.reject(err);
}

export const getCallInfo = () => api.get('/call/info').then(response => response.data);
