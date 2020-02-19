import { LOAD_DATA } from './actionTypes';
import { INSERT_DATA } from './mutationTypes';
import { getEntityActions } from './repositoryHelper';

async function loadData({ commit }, { itemType, filters = {} }) {
  const filtersToApply = {
    ...filters,
  };

  const { getAll } = getEntityActions(itemType);
  const { data } = await getAll(filtersToApply);
  commit(INSERT_DATA, { itemType, data });
}

export default {
  [LOAD_DATA](store, data) {
    return loadData(store, data);
  },
};
