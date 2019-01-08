/* eslint-disable no-use-before-define */
import Video from 'twilio-video';

import twilioEvents, { TWILIO_EVENTS } from '@/services/twilioEvents';

let previewTracks = null;
let activeRoom = null;

const TRACK_SUBSCRIBED = 'trackSubscribed';
const TRACK_UNSUBSCRIBED = 'trackUnsubscribed';
const PARTICIPANT_DISCONNECTED = 'participantDisconnected';
const DISCONNECTED = 'disconnected';

export function connectToRoom(name, token) {
  if (!activeRoom) {
    const connectOptions = {
      name,
      // logLevel: 'debug',
    };

    if (previewTracks) {
      connectOptions.tracks = previewTracks;
    }

    return Video.connect(
      token,
      connectOptions
    )
      .then(onRoomJoined)
      .catch(onRoomConnectionFailed);
  }

  return Promise.resolve(activeRoom);
}

export function initLocalPreview() {
  const promise = previewTracks ? Promise.resolve(previewTracks) : Video.createLocalTracks();

  return promise.then(tracks => {
    previewTracks = tracks;
    emitLocalTracksAdding(previewTracks);
  });
}

export function convertTracksToAttachable(tracks = []) {
  return tracks.map(track => track.attach());
}

export function detachTracks(tracks) {
  tracks.forEach(track => {
    track.detach().forEach(detachedElement => detachedElement.remove());
  });
}

// private methods

/**
 ** room handlers start
 */

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

  return room;
}

function onRoomConnectionFailed() {
  activeRoom = null;

  return Promise.reject();
}

function onRoomDisconnected() {
  if (previewTracks) {
    previewTracks.forEach(track => track.stop());
    emitLocalTracksRemoving(previewTracks);
    previewTracks = null;
  }

  activeRoom = null;
}

function handleLocalParticipantAdding(participant) {
  const tracks = Array.from(participant.tracks.values());
  emitLocalTracksAdding(tracks);
}

function handleRemoteParticipantAdding(participant) {
  const tracks = Array.from(participant.tracks.values());
  emitRemoteTracksAdding(tracks);
}

function onTrackSubscribed(track) {
  emitRemoteTracksAdding([track]);
}

function onTrackUnsubscribed(track) {
  emitRemoteTracksRemoving([track]);
}

function onParticipantDisconnected() {
  leaveRoomIfJoined();
}

function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}

/**
 ** room handlers finish
 */

/**
 ** twilio actions start
 */

function emitLocalTracksAdding(tracks) {
  twilioEvents.emit(TWILIO_EVENTS.LOCAL_TRACKS_ADDED, tracks);
}

function emitLocalTracksRemoving(tracks) {
  twilioEvents.emit(TWILIO_EVENTS.LOCAL_TRACKS_REMOVED, tracks);
}

function emitRemoteTracksAdding(tracks) {
  twilioEvents.emit(TWILIO_EVENTS.REMOTE_TRACKS_ADDED, tracks);
}

function emitRemoteTracksRemoving(tracks) {
  twilioEvents.emit(TWILIO_EVENTS.REMOTE_TRACK_REMOVED, tracks);
}

/**
 ** twilio actions finish
 */
