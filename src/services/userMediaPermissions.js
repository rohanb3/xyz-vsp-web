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
    video: camera.state,
    audio: microphone.state,
  }));
}

function testUserMedia(options = {}) {
  const constaints = {
    video: !isPermissionGranted(options.video),
    audio: !isPermissionGranted(options.audio),
  };
  if (!constaints.video && !constaints.audio) {
    return Promise.resolve(options);
  }

  if (options.audio) {
    constaints.audio = true;
  }

  if (options.video) {
    constaints.video = { width: 1280, height: 720 };
  }

  return navigator.mediaDevices
    .getUserMedia(constaints)
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
