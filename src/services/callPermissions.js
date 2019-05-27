/* eslint-disable import/prefer-default-export */

import { requestPermission as requestNotificationsPermission } from '@/services/callNotificationsUtils';
import { requestPermission as requestUserMediaPermission } from '@/services/userMedia';
import { statuses, errorMessages } from '@/constants/permissions';

export function checkAndRequestCallPermissions() {
  const permissions = {};
  return requestNotificationsPermission()
    .then(status => {
      permissions.notifications = status === statuses.GRANTED;
    })
    .catch(() => {
      permissions.notifications = false;
    })
    .then(requestUserMediaPermission)
    .then(mediaPermissions => {
      permissions.video = mediaPermissions.video === statuses.GRANTED;
      permissions.audio = mediaPermissions.audio === statuses.GRANTED;
    })
    .catch(() => {
      permissions.audio = false;
      permissions.video = false;
    })
    .then(() => {
      const blockedPermissions = Object.keys(permissions).filter(key => !permissions[key]);
      const isAnyBlockedPermission = blockedPermissions.length;
      if (isAnyBlockedPermission) {
        const error = new Error(errorMessages.PERMISSIONS_BLOCKED);
        error.blockedPermissions = blockedPermissions;
        return Promise.reject(error);
      }
      return Promise.resolve();
    });
}
