import { GET_COMPANIES, GET_BRANCHES } from './actionTypes';

import { SET_COMPANIES_DATA, SET_BRANCHES_DATA } from './mutationTypes';

import { getCompanies, getBranches } from '@/services/publicApiRepository';

export default {
  async [GET_COMPANIES]({ commit }, { keyword }) {
    const companies = await getCompanies(keyword);

    commit(SET_COMPANIES_DATA, companies);
  },
  async [GET_BRANCHES]({ commit }, { companyId, keyword }) {
    const branches = getBranches(companyId, keyword);

    commit(SET_BRANCHES_DATA, branches);
  },
};
