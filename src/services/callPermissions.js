/* eslint-disable import/prefer-default-export */

import { requestPermission as requestNotificationsPermission } from '@/services/callNotificationsUtils';
import { requestPermission as requestUserMediaPermission } from '@/services/userMedia';
import { PERMISSION_STATUSES, PERMISSION_ERROR_MESSAGES } from '@/constants';

export function checkAndRequestCallPermissions() {
  const permissions = {};
  return requestNotificationsPermission()
    .then(status => {
      permissions.notifications = status === PERMISSION_STATUSES.GRANTED;
    })
    .catch(() => {
      permissions.notifications = false;
    })
    .then(requestUserMediaPermission)
    .then(mediaPermissions => {
      permissions.video = mediaPermissions.video === PERMISSION_STATUSES.GRANTED;
      permissions.audio = mediaPermissions.audio === PERMISSION_STATUSES.GRANTED;
    })
    .catch(() => {
      permissions.audio = false;
      permissions.video = false;
    })
    .then(() => {
      const blockedPermissions = Object.keys(permissions).filter(key => !permissions[key]);
      const isAnyBlockedPermission = blockedPermissions.length;
      if (isAnyBlockedPermission) {
        const error = new Error(PERMISSION_ERROR_MESSAGES.PERMISSIONS_BLOCKED);
        error.blockedPermissions = blockedPermissions;
        return Promise.reject(error);
      }
      return Promise.resolve();
    });
}
