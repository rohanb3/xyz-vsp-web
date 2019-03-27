import { isEnabled } from './callNotificationsUtils';

let swRegistration;

export function setSWRegistration(registration) {
  swRegistration = registration;
}

export function notifyAboutCall() {
  console.log('notifyAboutCall');
  return new Promise((resolve, reject) => {
    if (isEnabled() && swRegistration) {
      swRegistration.showNotification('Incoming call', {
        tag: 'incoming-call',
        requireInteraction: true,
      });
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

export function handleUpdateCallsInfo(data) {
  if (data.size) {
    if (document.hidden) {
      notifyAboutCall();
    }
  } else {
    cleanUp();
  }
}
