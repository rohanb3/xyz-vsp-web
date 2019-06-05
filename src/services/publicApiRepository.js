import publicApi from './publicApi';
import {
  FILTER_NAMES_COMPANY_LIST,
  COMPANY_LIST_COLUMNS_SORTED,
  SORTING_DIRECTION,
} from '@/constants';

export const getBranches = (companyId, keyword) => {
  const params = { BranchNameFilter: keyword };

  return publicApi.get(`/company/${companyId}/branch`, { params }).then(({ data }) => data);
};

export const getCompanies = filters => {
  const params = {
    ...filters,
    [FILTER_NAMES_COMPANY_LIST.SORT_BY]: COMPANY_LIST_COLUMNS_SORTED.COMPANY_NAME,
    [FILTER_NAMES_COMPANY_LIST.TAKE]: 30,
    [FILTER_NAMES_COMPANY_LIST.SORT_ORDER]: SORTING_DIRECTION.ASC,
  };

  return publicApi.get('/company', { params }).then(({ data }) => console.log({ data }) || data);
};
