const STATUS_NOT_REQUESTED = 'default';
const STATUS_GRANTED = 'granted';
const STATUS_DENIED = 'denied';
const STATUS_ENABLED = 'enabled';
const STATUS_DISABLED = 'disabled';

export const statuses = {
  NOT_REQUESTED: STATUS_NOT_REQUESTED,
  GRANTED: STATUS_GRANTED,
  DENIED: STATUS_DENIED,
  ENABLED: STATUS_ENABLED,
  DISABLED: STATUS_DISABLED,
};

export function isGranted() {
  return Notification.permission === STATUS_GRANTED;
}

export function getStatus() {
  return isGranted()
    ? localStorage.getItem('notifications') || STATUS_ENABLED
    : Notification.permission;
}

export function isEnabled() {
  return isGranted() && getStatus() === STATUS_ENABLED;
}