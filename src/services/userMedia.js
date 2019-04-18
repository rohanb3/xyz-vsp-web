/* eslint-disable import/prefer-default-export, no-use-before-define */
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
  return Promise.all([cameraPromise, microphonePromise]).then(([camera, microphone]) => {
    const options = {};

    if (camera.state !== 'granted') {
      options.video = true;
    }

    if (microphone.state !== 'granted') {
      options.audio = true;
    }

    return options;
  });
}

function testUserMedia(options = {}) {
  if (!Object.keys(options).length) {
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
