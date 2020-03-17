import { CALL_DISPOSITIONS, CALL_TYPES } from '@/constants';

const defaultItemGetter = item => item.id;

export default {
  callTypes() {
    return [...CALL_TYPES];
  },
  tenantCompanies(state) {
    return state.tenantCompanies;
  },
  tenantUsers(state) {
    return state.tenantUsers;
  },
  allDevices(state) {
    return state.allDevices;
  },
  callDispositions() {
    return [...CALL_DISPOSITIONS];
  },
  getItemById: state => (itemId, tableName, getItemId = defaultItemGetter) =>
    state[tableName].items.find(item => getItemId(item) === itemId),
};
