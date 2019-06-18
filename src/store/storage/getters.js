const defaultItemGetter = item => item.id;

export default {
  callTypes() {
    return ['info', 'help', 'sale'];
  },
  callDispositions() {
    return ['Long Name', 'Another Name', 'One more'];
  },
  getItemById: state => (itemId, tableName, getItemId = defaultItemGetter) =>
    state[tableName].items.find(item => getItemId(item) === itemId),
};
