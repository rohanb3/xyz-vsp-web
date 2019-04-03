/* eslint-disable no-use-before-define */
import Video from 'twilio-video';

import twilioEvents, { TWILIO_EVENTS } from '@/services/twilioEvents';
import { isChrome, isFirefox } from '@/services/browser';
import { EXTENSION_ID } from '@/constants/twillio';

const previewTracks = {};
let activeRoom = null;
let extensionInstalled = false;
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
  return tracks.map(track => track && track.attach && track.attach()).filter(Boolean);
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

export function checkExtension() {
  return new Promise(resolve => {
    const onResponse = response => {
      const isInstalled = Boolean(response);
      extensionInstalled = isInstalled;
      resolve(isInstalled);
    };
    window.chrome.runtime.sendMessage(EXTENSION_ID, 'version', onResponse);
  });
}

export function enableScreenShare() {
  return checkExtension().then(() => {
    const promise = previewTracks.screenShare
      ? Promise.resolve(previewTracks.screenShare)
      : getUserScreen();

    return promise
      .then(stream => {
        const [track] = stream.getVideoTracks();
        previewTracks.screenShare = track;
        publishTrack(track);
        emitScreenShareAdding([track]);
      })
      .catch(() => new Error('Could not get stream'));
  });
}

export function disableScreenShare() {
  const track = previewTracks.screenShare;
  if (track) {
    stopTracks([track]);
    unpublishTrack(track);
    emitScreenShareRemoving([track]);
    delete previewTracks.screenShare;
  }
  return Promise.resolve();
}

// private methods

/**
 ** room handlers start
 */

function onRoomJoined(room) {
  activeRoom = room;

  if (!Object.keys(previewTracks).length) {
    enableLocalPreview();
  }

  room.participants.forEach(handleRemoteParticipantAdding);

  room.on(TRACK_SUBSCRIBED, onTrackSubscribed);
  room.on(TRACK_UNSUBSCRIBED, onTrackUnsubscribed);
  room.on(PARTICIPANT_CONNECTED, onParticipantConnected);
  room.on(PARTICIPANT_DISCONNECTED, onParticipantDisconnected);
  room.on(DISCONNECTED, onRoomDisconnected);

  return room;
}

function onRoomConnectionFailed(err) {
  activeRoom = null;

  return Promise.reject(err);
}

function onRoomDisconnected() {
  disableLocalPreview();
  disableScreenShare();
  activeRoom = null;
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

const isBrowserChrome = isChrome();
const isBrowserFirefox = isFirefox();

function getUserScreen() {
  if (!canShareScreen()) {
    return Promise.reject();
  }

  if (isBrowserChrome) {
    return getChromeScreen();
  }

  if (isBrowserFirefox) {
    return getFirefoxScreen();
  }

  return Promise.reject();
}

function getChromeScreen() {
  return createChromeExtensionPromise().then(response =>
    window.navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: response.streamId,
        },
      },
    })
  );
}

function getFirefoxScreen() {
  return window.navigator.mediaDevices.getUserMedia({
    video: {
      mediaSource: 'screen',
    },
  });
}

function createChromeExtensionPromise() {
  return new Promise((resolve, reject) => {
    const request = {
      sources: ['window', 'screen', 'tab'],
    };
    window.chrome.runtime.sendMessage(EXTENSION_ID, request, response => {
      if (response && response.type === 'success') {
        resolve({ streamId: response.streamId });
      } else {
        reject(new Error('Could not get stream'));
      }
    });
  });
}

function canShareScreen() {
  return extensionInstalled || isBrowserChrome || isBrowserFirefox;
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
  twilioEvents.emit(TWILIO_EVENTS.REMOTE_TRACKS_REMOVED, tracks);
}

function emitScreenShareAdding(tracks) {
  twilioEvents.emit(TWILIO_EVENTS.SCREEN_SHARED, tracks);
}

function emitScreenShareRemoving(tracks) {
  twilioEvents.emit(TWILIO_EVENTS.SCREEN_UNSHARED, tracks);
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
