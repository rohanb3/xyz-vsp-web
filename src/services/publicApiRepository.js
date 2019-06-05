import publicApi from './publicApi';

export const getBranches = (companyId, keyword) => {
  const params = { BranchNameFilter: keyword };

  return publicApi.get(`/company/${companyId}/branch`, { params }).then(({ data }) => data);
};

export const getCompanies = filters => {
  const params = { ...filters };

  return publicApi.get('/company', { params }).then(({ data }) => console.log({ data }) || data);
};
