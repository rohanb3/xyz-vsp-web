/* eslint-disable no-use-before-define */
import Video from 'twilio-video';

import { subscribe, emit } from '@/services/emitter';

let previewTracks = null;
let activeRoom = null;
let connectedToRoom = false;

const PARTICIPANT_CONNECTED = 'participantConnected';
const TRACK_ADDED = 'trackAdded';
const TRACK_REMOVED = 'trackRemoved';
const PARTICIPANT_DISCONNECTED = 'participantDisconnected';
const DISCONNECTED = 'disconnected';

const ROOM_DISCONNECTED = 'roomDisconnected';
const ROOM_JOINED = 'roomJoined';
const LOCAL_TRACK = 'localTrack';
const REMOTE_TRACK = 'remoteTrack';

export function connectToRoom(name, token) {
  if (!connectedToRoom) {
    const connectOptions = {
      name,
      // logLevel: 'debug',
    };

    if (previewTracks) {
      connectOptions.tracks = previewTracks;
    }

    console.log(123);

    return Video.connect(
      token,
      connectOptions
    )
      .then(onRoomJoined)
      .catch(onRoomConnectionFailed);
  }

  return Promise.reject();
}

export function listenRoomJoining(listener) {
  subscribe(ROOM_JOINED, listener);
}

export function listenParticipantConnection(listener) {
  subscribe(PARTICIPANT_CONNECTED, listener);
}

export function listenTrackAdding(listener) {
  subscribe(TRACK_ADDED, listener);
}

export function listenTrackRemoving(listener) {
  subscribe(TRACK_REMOVED, listener);
}

export function listenParticipantDisconnection(listener) {
  subscribe(PARTICIPANT_DISCONNECTED, listener);
}

export function listenToRoomDisconnection(listener) {
  subscribe(ROOM_DISCONNECTED, listener);
}

function onRoomJoined(room) {
  console.log('roomJoined');
  activeRoom = room;
  connectedToRoom = true;
  if (!previewTracks || !previewTracks.length) {
    handleParticipantTracksAdding(room.localParticipant, LOCAL_TRACK);
  }

  room.participants.forEach(participant =>
    handleParticipantTracksAdding(participant, REMOTE_TRACK)
  );

  room.on(PARTICIPANT_CONNECTED, onParticipantConnected);
  room.on(TRACK_ADDED, onTrackAdded);
  room.on(TRACK_REMOVED, onTrackRemoved);
  room.on(PARTICIPANT_DISCONNECTED, onParticipantDisconnected);
  room.on(DISCONNECTED, onRoomDisconnected);

  emit(ROOM_JOINED, room);

  console.log(room);
  return room;
}

function onRoomConnectionFailed(err) {
  console.log(err);
  activeRoom = null;
  connectedToRoom = false;
}

export function attachTracks(tracks, container) {
  tracks.forEach(track => container.appendChild(track.attach()));
}

export function detachTracks(tracks) {
  tracks.forEach(track => {
    track.detach().forEach(detachedElement => {
      detachedElement.remove();
    });
  });
}

function onRoomDisconnected() {
  if (previewTracks) {
    previewTracks.forEach(track => track.stop());
  }

  activeRoom = null;

  emit(ROOM_DISCONNECTED);
}

function handleParticipantTracksAdding(participant, role) {
  const tracks = Array.from(participant.tracks.values());
}

function onParticipantConnected(participant) {
  emit(PARTICIPANT_CONNECTED, participant);
}

function onTrackAdded(track) {
  emit(TRACK_ADDED, track);
}

function onTrackRemoved(track) {
  emit(TRACK_REMOVED, track);
}

function onParticipantDisconnected(participant) {
  emit(PARTICIPANT_DISCONNECTED, participant);
  leaveRoomIfJoined();
}

export function initLocalPreview() {
  const promise = previewTracks ? Promise.resolve(previewTracks) : Video.createLocalTracks();

  return promise.then(tracks => {
    previewTracks = tracks;
  });
}

function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom = null;
    connectedToRoom = false;
    activeRoom.disconnect();
  }
}

window.addEventListener('beforeunload', leaveRoomIfJoined);
