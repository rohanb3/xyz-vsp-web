/* eslint-disable import/prefer-default-export, no-use-before-define */
import { statuses } from '@/constants/permissions';

export function requestPermission() {
  return queryPermissions()
    .then(testUserMedia)
    .catch(err => {
      /* eslint-disable-next-line no-console */
      console.error('Media permissions request failed: ', err);
    });
}

function queryPermissions() {
  const cameraPromise = navigator.permissions.query({ name: 'camera' });
  const microphonePromise = navigator.permissions.query({ name: 'microphone' });
  return Promise.all([cameraPromise, microphonePromise]).then(([camera, microphone]) => ({
    video: !isPermissionGranted(camera),
    audio: !isPermissionGranted(microphone),
  }));
}

function testUserMedia(options = {}) {
  if (!options.video && !options.audio) {
    return Promise.resolve();
  }

  const constaints = {};

  if (options.audio) {
    constaints.audio = true;
  }

  if (options.video) {
    constaints.video = { width: 1280, height: 720 };
  }

  return navigator.mediaDevices.getUserMedia(constaints).then(stream => {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  });
}

function isPermissionGranted(permission) {
  return permission.state === statuses.GRANTED;
}
