import { PERMISSION_STATUSES } from '@/constants';

export function isGranted() {
  return Notification.permission === PERMISSION_STATUSES.GRANTED;
}

export function isEnabled() {
  return isGranted();
}

export function requestPermission() {
  return isGranted
    ? Notification.requestPermission()
    : Promise.resolve(PERMISSION_STATUSES.GRANTED);
}
