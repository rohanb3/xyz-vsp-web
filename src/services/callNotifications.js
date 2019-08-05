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
    if (isEnabled() && swRegistration) {
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
  if (calls.size) {
    notifyAboutCall();
  } else {
    cleanUp();
  }
}
