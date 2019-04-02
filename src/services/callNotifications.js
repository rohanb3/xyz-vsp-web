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
  return initPromise
    .then(() => {
      if (isEnabled() && swRegistration) {
        return swRegistration.showNotification('Incoming call', {
          tag: 'incoming-call',
          requireInteraction: true,
        });
      }

      return Promise.reject();
    })
    .catch(console.log.bind(null, 'notifyAboutCall.catch'));
}

export function cleanUp() {
  if (swRegistration) {
    swRegistration
      .getNotifications()
      .then(notifications => notifications.forEach(notification => notification.close()));
  } else {
    console.warn('sw not ready');
  }
}

export function handleUpdateCallsInfo(calls) {
  if (calls.size) {
    if (document.hidden) {
      notifyAboutCall();
    }
  } else {
    cleanUp();
  }
}
