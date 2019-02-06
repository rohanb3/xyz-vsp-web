/* eslint-disable no-use-before-define */
import Video from 'twilio-video';

import twilioEvents, { TWILIO_EVENTS } from '@/services/twilioEvents';

const previewTracks = {};
let activeRoom = null;
let onLastParticipantDisconnected = null;

const TRACK_SUBSCRIBED = 'trackSubscribed';
const TRACK_UNSUBSCRIBED = 'trackUnsubscribed';
const PARTICIPANT_CONNECTED = 'participantConnected';
const PARTICIPANT_DISCONNECTED = 'participantDisconnected';
const DISCONNECTED = 'disconnected';

export function connect({ name, token }, handlers = {}) {
  onLastParticipantDisconnected = handlers.onRoomEmptied || (() => {});

  if (!activeRoom) {
    const connectOptions = {
      name,
      // logLevel: 'debug',
    };

    if (Object.keys(previewTracks).length) {
      connectOptions.tracks = Object.values(previewTracks);
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

export function enableLocalPreview() {
  return Promise.all([enableLocalVideo(), enableLocalAudio()]);
}

export function disableLocalPreview() {
  return Promise.all([disableLocalVideo(), disableLocalAudio()]);
}

export function enableLocalVideo() {
  const promise = previewTracks.video
    ? Promise.resolve(previewTracks.video)
    : Video.createLocalVideoTrack();

  return promise.then(track => {
    previewTracks.video = track;
    publishTrack(track);
    emitLocalTracksAdding([track]);
  });
}

export function enableLocalAudio() {
  const promise = previewTracks.audio
    ? Promise.resolve(previewTracks.audio)
    : Video.createLocalAudioTrack();

  return promise.then(track => {
    previewTracks.audio = track;
    publishTrack(track);
    emitLocalTracksAdding([track]);
  });
}

export function disableLocalVideo() {
  const track = previewTracks.video;
  if (track) {
    stopTracks([track]);
    unpublishTrack(track);
    emitLocalTracksRemoving([track]);
    delete previewTracks.video;
  }
  return Promise.resolve();
}

export function disableLocalAudio() {
  const track = previewTracks.audio;
  if (track) {
    stopTracks([track]);
    unpublishTrack(track);
    emitLocalTracksRemoving([track]);
    delete previewTracks.audio;
  }
  return Promise.resolve();
}

export function convertTracksToAttachable(tracks = []) {
  return tracks.map(track => track.attach());
}

export function detachTracks(tracks) {
  tracks.forEach(track => {
    track.detach().forEach(detachedElement => detachedElement.remove());
  });
}

export function disconnect() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}

// private methods

/**
 ** room handlers start
 */

function onRoomJoined(room) {
  activeRoom = room;

  if (!Object.keys(previewTracks).length) {
    handleLocalParticipantAdding(room.localParticipant);
  }

  room.participants.forEach(handleRemoteParticipantAdding);

  room.on(TRACK_SUBSCRIBED, onTrackSubscribed);
  room.on(TRACK_UNSUBSCRIBED, onTrackUnsubscribed);
  room.on(PARTICIPANT_CONNECTED, onParticipantConnected);
  room.on(PARTICIPANT_DISCONNECTED, onParticipantDisconnected);
  room.on(DISCONNECTED, onRoomDisconnected);

  return room;
}

function onRoomConnectionFailed() {
  activeRoom = null;

  return Promise.reject();
}

function onRoomDisconnected() {
  activeRoom = null;
  disableLocalPreview();
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

function onParticipantConnected() {
  emitParticpantConnecting();
}

function onParticipantDisconnected() {
  emitParticpantDisconnecting();
  if (!activeRoom.participants.size) {
    onLastParticipantDisconnected();
    disconnect();
  }
}

function stopTracks(tracks = []) {
  tracks.forEach(track => track.stop());
}

function publishTrack(track) {
  if (activeRoom) {
    activeRoom.localParticipant.publishTrack(track);
  }
}

function unpublishTrack(track) {
  if (activeRoom) {
    activeRoom.localParticipant.unpublishTrack(track);
  }
}

/**
 ** room handlers finish
 */

/**
 ** twilio events start
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

function emitParticpantConnecting() {
  twilioEvents.emit(TWILIO_EVENTS.PARTICIPANT_CONNECTED);
}

function emitParticpantDisconnecting() {
  twilioEvents.emit(TWILIO_EVENTS.PARTICIPANT_DISCONNECTED);
}

/**
 ** twilio events finish
 */
