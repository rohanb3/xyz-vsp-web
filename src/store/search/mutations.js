import { SET_COMPANIES_DATA, SET_BRANCHES_DATA } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_COMPANIES_DATA](state, companies) {
    state.companies = companies;
  },
  [SET_BRANCHES_DATA](state, branches) {
    state.branches = branches;
  },
  /* eslint-enable no-param-reassign */
};
