import { CALL_DISPOSITIONS, CALL_TYPES } from '@/constants';

const defaultItemGetter = item => item.id;

export default {
  callTypes() {
    return [...CALL_TYPES];
  },
  callDispositions() {
    return [...CALL_DISPOSITIONS];
  },
  getItemById: state => (itemId, tableName, getItemId = defaultItemGetter) =>
    state[tableName].items.find(item => getItemId(item) === itemId),
};
