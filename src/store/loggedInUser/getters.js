import { ROLE_TYPES } from '@/constants';

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
    return state.profileData ? state.profileData.role : null;
  },
  isSuperAdmin(state, { role = '' }) {
    return [OPERATION_ADMIN, SYSTEM_ADMIN, ACCOUNT_ADMIN].includes(role.toLowerCase());
  },
  isOperationAdmin(state, { role }) {
    return role === OPERATION_ADMIN;
  },
  isSupportAdmin(state, { role }) {
    return role === SUPPORT_ADMIN;
  },
};
