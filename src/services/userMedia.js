/* eslint-disable no-use-before-define */
import { statuses } from '@/constants/permissions';

const defaultConstraints = {
  audio: true,
  video: true,
};

export function requestPermission() {
  return queryPermissions()
    .then(testUserMedia)
    .catch(err => {
      /* eslint-disable-next-line no-console */
      console.error('Media permissions request failed: ', err);
    });
}

export function getUserMediaStreams(constraints = defaultConstraints) {
  return navigator.mediaDevices.getUserMedia(constraints);
}

function queryPermissions() {
  const cameraPromise = navigator.permissions.query({ name: 'camera' });
  const microphonePromise = navigator.permissions.query({ name: 'microphone' });
  return Promise.all([cameraPromise, microphonePromise]).then(([camera, microphone]) => ({
    video: camera.state,
    audio: microphone.state,
  }));
}

function testUserMedia(options = {}) {
  const constraints = {
    video: !isPermissionGranted(options.video),
    audio: !isPermissionGranted(options.audio),
  };
  if (!constraints.video && !constraints.audio) {
    return Promise.resolve(options);
  }

  if (options.audio) {
    constraints.audio = true;
  }

  if (options.video) {
    constraints.video = { width: 1280, height: 720 };
  }

  return getUserMediaStreams(constraints)
    .then(stream => {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    })
    .then(queryPermissions)
    .catch(queryPermissions);
}

function isPermissionGranted(status) {
  return status === statuses.GRANTED;
}
