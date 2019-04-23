import { statuses } from '@/constants/permissions';

export function isGranted() {
  return Notification.permission === statuses.GRANTED;
}

export function isEnabled() {
  return isGranted();
}

export function requestPermission() {
  return isGranted ? Notification.requestPermission() : Promise.resolve(statuses.GRANTED);
}
