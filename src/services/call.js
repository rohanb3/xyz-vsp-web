/* eslint-disable no-use-before-define, import/prefer-default-export */

import store from '@/store';
import { GET_CALL_CUSTOMER_DATA } from '@/store/call/actionTypes';
import {
  SET_OPERATOR_STATUS,
  SET_CALL_TOKEN,
  SET_CALL_DATA,
  SET_CONNECTION_TO_CALL_SOCKET,
  SET_PENDING_CALLS_INFO,
  SET_CONNECTION_DROPPED,
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
  listenToConnectionDropped,
  listenToUnauthorizedConnection,
} from '@/services/operatorSocket';
import { connect as connectToRoom, disconnect as disconnectFromRoom } from '@/services/twilio';
import { TWILIO, OPERATOR_SOCKET, USER_MEDIA_ERROR_MESSAGES } from '@/constants';
import api from '@/services/api';

import { handleUpdateCallsInfo } from '@/services/callNotifications';
import { checkAndRequestCallPermissions } from '@/services/callPermissions';
import { checkAndSaveWaitingFeedbacks } from '@/services/operatorFeedback';
import { getUserMediaStreams } from '@/services/userMedia';
import { log } from '@/services/sentry';

import { REFRESH_TOKEN } from '@/store/loggedInUser/actionTypes';

const { VIDEO } = TWILIO;

export const errors = {
  ...OPERATOR_SOCKET.ERROR_MESSAGES,
  ...USER_MEDIA_ERROR_MESSAGES,
};

export function initializeOperator() {
  return checkAndRequestCallPermissions()
    .then(checkConnectAvailability)
    .then(() => {
      const identity = store.getters.userId;
      const {
        token: { accessToken },
        profileData: { userName, displayName },
      } = store.state.loggedInUser;
      const credentials = { identity, token: accessToken };
      log('call.js -> initializeOperator()', identity, displayName, userName);
      return initiOperatorSocker(credentials, checkAndUpdateCallsInfo, setConnectedToSocket);
    })
    .then(listenToUnauthorizedConnection)
    .catch(refreshToken)
    .then(trackConnectionAvailability)
    .then(checkAndSaveWaitingFeedbacks);
}

function checkConnectAvailability() {
  return new Promise((resolve, reject) => {
    if (store.getters.connectionDropped) {
      reject();
    } else {
      resolve();
    }
  });
}

function trackConnectionAvailability() {
  listenToConnectionDropped()
    .then(disconnectOperator)
    .then(() => store.commit(SET_CONNECTION_DROPPED, true));
}

export function disconnectOperator() {
  disconnectFromRoom();
  disconnectFromSocket();
  return Promise.resolve();
}

export function acceptCall() {
  setConnectingStatus();
  const identity = store.getters.userId;
  log('call.js -> acceptCall()', identity);

  console.log('call.js -> acceptCall()');

  function requestPermission() {
    return getUserMediaStreams().then(stream => {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      console.log('Tracks stopped');
    });
  }

  const roomConnectionPromise = requestPermission()
    .catch(() => {
      /**
       *  Sometimes we need more time to check video stream, cause it can be locked by another process
       * */
      console.log('Check permission failed');
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          console.log('2nd attempt to check permissions');
          requestPermission()
            .then(resolve)
            .catch(e => {
              console.log('2nd attempt also failed');
              reject(e);
            });
        }, 500)
      );
    })
    .then(() => console.log('call.js -> got streams'))
    .then(() => notifyAboutAcceptingCall())
    .then(({ token, ...call }) => {
      console.log('call.js -> onCallAccepted()');
      log('call.js -> onCallAccepted()', call);
      const credentials = { name: call.id, token };
      const handlers = {
        onRoomEmptied,
      };
      const media = { [VIDEO]: true };
      store.commit(SET_CALL_DATA, call);
      store.dispatch(GET_CALL_CUSTOMER_DATA, call.salesRepId);
      setToken(token);
      console.log('Start connecting to room');
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
  const { activeCallData, userId } = store.getters;
  log('call.js -> finishCall()', userId, activeCallData);
  notifyAboutFinishingCall(activeCallData.id);
  disconnectFromRoom();
  setFinishedCallOperatorStatus();
  return Promise.resolve();
}

export function callBack() {
  const { activeCallData, userId } = store.getters;
  log('call.js -> callBack()', userId, activeCallData);
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
  console.log('log4', connected);
  store.commit(SET_CONNECTION_TO_CALL_SOCKET, connected);
}

function onCallAcceptingFailed(err) {
  console.log('failed', err);
  disconnectFromRoom();
  return Promise.reject(getAcceptingCallError(err));
}

function getAcceptingCallError(err) {
  let acceptingCallError = err;

  if (err instanceof DOMException) {
    acceptingCallError = new Error(errors.USER_MEDIA_FAILED);
  }

  if (err.message === OPERATOR_SOCKET.ERROR_MESSAGES.CALLS_EMPTY) {
    acceptingCallError = new Error(errors.CALLS_EMPTY);
  }
  if (err.message === OPERATOR_SOCKET.ERROR_MESSAGES.CALL_ACCEPTING_FAILED) {
    acceptingCallError = new Error(errors.CALL_ACCEPTING_FAILED);
  }

  log('Call accepting failed', { originalError: err, error: acceptingCallError });

  return acceptingCallError;
}

export const getCallInfo = () => api.get('/call/info').then(response => response.data);

function refreshToken(error) {
  const { message } = error;
  if (message === OPERATOR_SOCKET.TOKEN_INVALID) {
    store.dispatch(REFRESH_TOKEN).then(() => {
      initializeOperator();
    });
  }

  return error;
}
