import { ROLE_TYPES, PERMISSIONS } from '@/constants';

const { OPERATION_ADMIN, SYSTEM_ADMIN, ACCOUNT_ADMIN, SUPPORT_ADMIN } = ROLE_TYPES;

export default {
  /* eslint-disable no-shadow */
  loggedInUserName(state) {
    return state.profileData ? state.profileData.userName : '';
  },
  userData(state) {
    return state.profileData;
  },
  userId(state) {
    return state.profileData ? state.profileData.objectId : null;
  },
  role(state) {
    return state.profileData ? state.profileData.role.toLowerCase() : null;
  },
  isSuperAdmin(state, { role = '' }) {
    return [OPERATION_ADMIN, SYSTEM_ADMIN, ACCOUNT_ADMIN].includes(role);
  },
  isOperationAdmin(state, { role = '' }) {
    return role === OPERATION_ADMIN;
  },
  isSupportAdmin(state, { role = '' }) {
    return role === SUPPORT_ADMIN;
  },
  isCallsAllowed({ profileData }) {
    const { scopes = [] } = profileData;
    return scopes.includes(PERMISSIONS.CALL_ANSWER);
  },
  isRealtimeDashboardAllowed({ profileData }) {
    const { scopes = [] } = profileData;
    return scopes.includes(PERMISSIONS.REALTIME_DASHBOARD);
  },
  isSocketConnectionNeeded(state, { isCallsAllowed, isRealtimeDashboardAllowed }) {
    return isCallsAllowed || isRealtimeDashboardAllowed;
  },
  vspSocketCredentials({ token }, { userId }) {
    if (userId && token) {
      const { accessToken } = token;
      return {
        identity: userId,
        token: accessToken,
      };
    }

    return null;
  },
  isTenantFilterAllowed({ profileData }) {
    const { scopes = [] } = profileData;
    return (
      scopes.includes(PERMISSIONS.REALTIME_DASHBOARD_CHOOSE_TENANT) &&
      scopes.includes(PERMISSIONS.DASHBOARD_CHOOSE_TENANT)
    );
  },
};
