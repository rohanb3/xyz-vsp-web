import { isEnabled } from './callNotificationsUtils';

let swRegistration;

export function setSWRegistration(registration) {
  swRegistration = registration;
}

export function notifyAboutCall() {
  return new Promise((resolve, reject) => {
    if (isEnabled() && swRegistration) {
      swRegistration.showNotification('Incoming call', {
        tag: 'incoming-call',
        requireInteraction: true,
      });
      resolve();
    } else {
      reject();
    }
  });
}

export function cleanUp() {
  swRegistration
    .getNotifications()
    .then(notifications => notifications.forEach(notification => notification.close()));
}

export function handleUpdateCallsInfo(showNotification) {
  if (showNotification) {
    if (document.hidden) {
      notifyAboutCall();
    }
  } else {
    cleanUp();
  }
}
