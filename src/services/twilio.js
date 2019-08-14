/* eslint-disable no-use-before-define */
import Video from 'twilio-video';

import twilioEvents, { TWILIO_EVENTS } from '@/services/twilioEvents';
import { isChrome, isFirefox } from '@/services/browser';
import { TWILIO } from '@/constants';

const { EXTENSION_ID, VIDEO, AUDIO } = TWILIO;

const previewTracks = {};
const remoteTracks = new Set();
let activeRoom = null;
let extensionInstalled = false;
let onLastParticipantDisconnected = () => {};
let disconnectAfterConnection = false;

const TRACK_SUBSCRIBED = 'trackSubscribed';
const TRACK_UNSUBSCRIBED = 'trackUnsubscribed';
const TRACK_STARTED = 'trackStarted';
const PARTICIPANT_CONNECTED = 'participantConnected';
const PARTICIPANT_DISCONNECTED = 'participantDisconnected';
const DISCONNECTED = 'disconnected';
const RECONNECTING = 'reconnecting';
const RECONNECTED = 'reconnected';
const NETWORK_QUALITY_LEVEL_CHANGED = 'networkQualityLevelChanged';
const INACTIVE = 'inactive';
const ERROR = 'error';

export function connect({ name, token }, { media = {}, handlers = {} }) {
  console.log('connect-->');

  onLastParticipantDisconnected = handlers.onRoomEmptied || onLastParticipantDisconnected;
  disconnectAfterConnection = false;

  if (!activeRoom) {
    const previewPromises = [];
    if (media[VIDEO]) {
      previewPromises.push(enableLocalVideo());
    }
    if (media[AUDIO]) {
      previewPromises.push(enableLocalAudio());
    }

    return Promise.all(previewPromises)
      .then(() => {
        console.log('media enabled-->');
        const connectOptions = {
          name,
          networkQuality: {
            local: 3,
            remote: 3,
          },
          // logLevel: 'debug',
        };

        if (Object.keys(previewTracks).length) {
          connectOptions.tracks = Object.values(previewTracks);
        } else {
          connectOptions.tracks = [];
        }

        console.log('Before video connect');

        return Video.connect(
          token,
          connectOptions
        );
      })
      .then(onRoomJoined)
      .catch(onRoomConnectionFailed);
  }

  return Promise.resolve(activeRoom);
}

export function enableLocalPreview() {
  console.log('enableLocalPreview-->');
  return Promise.all([enableLocalVideo(), enableLocalAudio()]);
}

export function disableLocalPreview() {
  return Promise.all([disableLocalVideo(), disableLocalAudio()]);
}

export function enableLocalVideo() {
  console.log('enableLocalVideo-->', !!previewTracks.video, previewTracks.video);

  const promise = previewTracks.video
    ? Promise.resolve(previewTracks.video)
    : Video.createLocalVideoTrack();

  return promise.then(track => {
    console.log('createdVideoTrack-->');
    previewTracks.video = track;
    publishTrack(track);
    console.log('Track published');
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
  console.log('convert-->');
  return tracks.map(track => track && track.attach && track.attach()).filter(Boolean);
}

export function detachTracks(tracks) {
  console.log('detach-->');
  tracks.forEach(track => {
    track.detach().forEach(detachedElement => detachedElement.remove());
  });
}

export function disconnect() {
  if (activeRoom) {
    activeRoom.disconnect();
  } else {
    disconnectAfterConnection = true;
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
        emitScreenShareAdding(stream);
        const onStreamInactive = () => {
          /* eslint-disable-next-line */
          console.log('onStreamInactive');
          disableScreenShare();
          stream.removeEventListener(INACTIVE, onStreamInactive);
        };
        const onStreamError = err => {
          /* eslint-disable-next-line */
          console.log('onStreamError', err);
          disableScreenShare();
          emitScreenSharingError(err);
          stream.removeEventListener(ERROR, onStreamError);
        };
        stream.addEventListener(INACTIVE, onStreamInactive);
        stream.addEventListener(ERROR, onStreamError);
      })
      .catch(err => {
        /* eslint-disable-next-line */
        console.log('Can not get stream', err);
      });
  });
}

export function disableScreenShare() {
  const track = previewTracks.screenShare;
  if (track) {
    stopTracks([track]);
    unpublishTrack(track);
    emitScreenShareRemoving(track);
    delete previewTracks.screenShare;
  }
  return Promise.resolve();
}

export function getCachedLocalTracks() {
  return Object.values(previewTracks);
}

export function getCachedRemoteTracks() {
  return [...remoteTracks];
}

// private methods

/**
 ** room handlers start
 */

function onRoomJoined(room) {
  console.log('onRoomJoined', room);

  if (disconnectAfterConnection) {
    disconnectAfterConnection = false;
    room.disconnect();
    onRoomDisconnected();
    return Promise.resolve(null);
  }
  return new Promise(resolve => {
    activeRoom = room;

    if (!Object.keys(previewTracks).length) {
      enableLocalPreview();
    }
    const roomResolver = () => resolve(room);

    room.localParticipant.on(NETWORK_QUALITY_LEVEL_CHANGED, onLocalParticipantNetworkLevelChanged);

    room.participants.forEach(participant =>
      handleRemoteParticipantAdding(participant, roomResolver)
    );

    room.on(TRACK_SUBSCRIBED, onTrackSubscribed);
    room.on(TRACK_UNSUBSCRIBED, onTrackUnsubscribed);
    room.on(PARTICIPANT_CONNECTED, onParticipantConnected);
    room.on(PARTICIPANT_DISCONNECTED, onParticipantDisconnected);
    room.on(DISCONNECTED, onRoomDisconnected);
    room.on(TRACK_STARTED, track => onTrackStarted(track, roomResolver));
    room.on(RECONNECTING, onRoomReconnecting);
    room.on(RECONNECTED, onRoomReconnected);

    const skipVideoKey = 'GO_TO_CALL_DO_NOT_WAIT_FOR_VIDEO';
    if (localStorage.getItem(skipVideoKey) === 'true') {
      roomResolver();
    } else {
      localStorage.setItem(skipVideoKey, false);
    }
  });
}

function onRoomConnectionFailed(err) {
  console.log('onRoomConnectionFailed', { err });
  return Promise.all([disableLocalPreview(), disableScreenShare()]).then(() => {
    activeRoom = null;
    return Promise.reject(err);
  });
}

function onRoomDisconnected(room, err) {
  disableLocalPreview();
  disableScreenShare();
  activeRoom = null;
  if (err) {
    emitRoomDisconnectWithError(err);
  }
}

function handleRemoteParticipantAdding(participant, resolve) {
  participant.on(NETWORK_QUALITY_LEVEL_CHANGED, onRemoteParticipantNetworkLevelChanged);
  const tracks = Array.from(participant.tracks.values()).filter(track => !!track);
  tracks.forEach(track => {
    if (track.kind === VIDEO && track.isStarted) {
      resolve();
    }
  });
  remoteTracks.add(...tracks);
  emitRemoteTracksAdding(tracks);
}

function onTrackSubscribed(track) {
  if (track) {
    remoteTracks.add(track);
    emitRemoteTracksAdding([track]);
  }
}

function onTrackUnsubscribed(track) {
  remoteTracks.delete(track);
  emitRemoteTracksRemoving([track]);
}

function onParticipantConnected(participant) {
  participant.on(NETWORK_QUALITY_LEVEL_CHANGED, onRemoteParticipantNetworkLevelChanged);
  emitParticpantConnecting();
}

function onParticipantDisconnected() {
  emitParticpantDisconnecting();
  if (!activeRoom.participants.size) {
    onLastParticipantDisconnected();
    disconnect();
  }
}

function onRoomReconnecting() {
  emitRoomReconnecting();
}

function onRoomReconnected() {
  emitRoomReconnected();
}

function onLocalParticipantNetworkLevelChanged(level) {
  emitLocalParticipantNetworkLevelChanging(level);
}

function onRemoteParticipantNetworkLevelChanged(level) {
  emitRemoteParticipantNetworkLevelChanging(level);
}

function onTrackStarted(track, resolve) {
  if (track.kind === VIDEO) {
    resolve();
  }
}

function stopTracks(tracks = []) {
  tracks.forEach(track => track.stop());
  console.log('twilio tracks stopped');
}

function publishTrack(track) {
  console.log('publish track', track);
  if (activeRoom) {
    console.log('Room is active', activeRoom);
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

function emitScreenShareAdding(stream) {
  twilioEvents.emit(TWILIO_EVENTS.SCREEN_SHARED, stream);
}

function emitScreenShareRemoving(stream) {
  twilioEvents.emit(TWILIO_EVENTS.SCREEN_UNSHARED, stream);
}

function emitParticpantConnecting() {
  twilioEvents.emit(TWILIO_EVENTS.PARTICIPANT_CONNECTED);
}

function emitParticpantDisconnecting() {
  twilioEvents.emit(TWILIO_EVENTS.PARTICIPANT_DISCONNECTED);
}

function emitRoomReconnecting() {
  twilioEvents.emit(TWILIO_EVENTS.RECONNECTING);
}

function emitRoomReconnected() {
  twilioEvents.emit(TWILIO_EVENTS.RECONNECTED);
}

function emitRoomDisconnectWithError(err) {
  twilioEvents.emit(TWILIO_EVENTS.DISCONNECTED_WITH_ERROR, err);
}

function emitLocalParticipantNetworkLevelChanging(level) {
  twilioEvents.emit(TWILIO_EVENTS.LOCAL_PARTICIPANT_NETWORK_LEVEL_CHANGED, level);
}

function emitRemoteParticipantNetworkLevelChanging(level) {
  twilioEvents.emit(TWILIO_EVENTS.REMOTE_PARTICIPANT_NETWORK_LEVEL_CHANGED, level);
}

function emitScreenSharingError(err) {
  twilioEvents.emit(TWILIO_EVENTS.SCREEN_SHARING_ERROR, err);
}

/**
 ** twilio events finish
 */
