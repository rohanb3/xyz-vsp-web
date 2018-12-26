/* eslint-disable no-use-before-define */
import Video from 'twilio-video';

import { subscribeMultiple, emit } from '@/services/emitter';

let previewTracks = null;
let activeRoom = null;
let localMediaSelector = null;
let remoteMediaSelector = null;

const TRACK_SUBSCRIBED = 'trackSubscribed';
const TRACK_UNSUBSCRIBED = 'trackUnsubscribed';
const PARTICIPANT_DISCONNECTED = 'participantDisconnected';
const DISCONNECTED = 'disconnected';

const ROOM_DISCONNECTED = 'roomDisconnected';
const ROOM_JOINED = 'roomJoined';

export function initTwilio(mediaSelectors = {}, listeners = {}) {
  localMediaSelector = mediaSelectors.local;
  remoteMediaSelector = mediaSelectors.remote;
  subscribeMultiple(listeners);
}

export function connectToRoom(name, token) {
  if (!activeRoom) {
    const connectOptions = {
      name,
      // logLevel: 'debug',
    };

    if (previewTracks) {
      connectOptions.tracks = previewTracks;
    }

    return initLocalPreview()
      .then(() =>
        Video.connect(
          token,
          connectOptions
        )
      )
      .then(onRoomJoined)
      .catch(onRoomConnectionFailed);
  }

  return Promise.reject();
}

function onRoomJoined(room) {
  activeRoom = room;

  if (!previewTracks || !previewTracks.length) {
    handleLocalParticipantAdding(room.localParticipant);
  }

  room.participants.forEach(handleRemoteParticipantAdding);

  room.on(TRACK_SUBSCRIBED, onTrackSubscribed);
  room.on(TRACK_UNSUBSCRIBED, onTrackUnsubscribed);
  room.on(PARTICIPANT_DISCONNECTED, onParticipantDisconnected);
  room.on(DISCONNECTED, onRoomDisconnected);

  emit(ROOM_JOINED, room);

  return room;
}

function onRoomConnectionFailed() {
  activeRoom = null;

  return Promise.reject();
}

function onRoomDisconnected() {
  if (previewTracks) {
    previewTracks.forEach(track => track.stop());
  }

  activeRoom = null;

  emit(ROOM_DISCONNECTED);
}

function handleLocalParticipantAdding(participant) {
  const tracks = Array.from(participant.tracks.values());
  attachLocalTracks(tracks);
}

function handleRemoteParticipantAdding(participant) {
  const tracks = Array.from(participant.tracks.values());
  attachRemoteTracks(tracks);
}

function attachLocalTracks(tracks) {
  const container = document.querySelector(localMediaSelector);
  attachTracks(tracks, container);
}

function attachRemoteTracks(tracks) {
  const container = document.querySelector(remoteMediaSelector);
  attachTracks(tracks, container);
}

function attachTracks(tracks, container) {
  tracks.forEach(track => container.appendChild(track.attach()));
}

function detachTracks(tracks) {
  tracks.forEach(track => {
    track.detach().forEach(detachedElement => {
      detachedElement.remove();
    });
  });
}

function onTrackSubscribed(track) {
  attachRemoteTracks([track]);
}

function onTrackUnsubscribed(track) {
  detachTracks([track]);
}

function onParticipantDisconnected() {
  leaveRoomIfJoined();
}

function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
    activeRoom = null;
    previewTracks = null;
  }
}

function initLocalPreview() {
  const promise = previewTracks ? Promise.resolve(previewTracks) : Video.createLocalTracks();

  return promise.then(tracks => {
    previewTracks = tracks;
    attachLocalTracks(tracks);
  });
}

window.addEventListener('beforeunload', leaveRoomIfJoined);
