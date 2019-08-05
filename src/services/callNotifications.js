import { isEnabled } from './callNotificationsUtils';

let swRegistration;
let initPromiseResolver;
const initPromise = new Promise(success => {
  initPromiseResolver = success;
});

export function setSWRegistration(registration) {
  swRegistration = registration;
  initPromiseResolver();
}

export function notifyAboutCall() {
  return initPromise.then(() => {
    const enabled = isEnabled();

    if (!enabled) {
      console.log('Notification permission not granted');
    }

    if (enabled && swRegistration) {
      return swRegistration.showNotification('Incoming call', {
        tag: 'incoming-call',
        requireInteraction: true,
      });
    }

    return Promise.reject();
  });
}

export function cleanUp() {
  if (swRegistration) {
    swRegistration
      .getNotifications()
      .then(notifications => notifications.forEach(notification => notification.close()));
  }
}

export function handleUpdateCallsInfo(calls) {
  console.log(
    `Notification handler called. Calls size: ${calls.size}, document ${
      document.hidden ? 'hidden' : 'shown'
    }`
  );
  if (calls.size) {
    notifyAboutCall();
  } else {
    cleanUp();
  }
}
