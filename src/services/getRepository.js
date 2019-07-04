import companiesApi from './companiesApi';
import locationApi from './locationApi';
import branchesApi from './branchesApi';

export const getStateList = () => locationApi.get('/state').then(({ data }) => data);

export const getCityList = () => locationApi.get('/city').then(({ data }) => data);

export const getCompanyList = (search = null, skip = 0, take = 20) => {
  const params = { skip, take, SearchFilter: search };
  return companiesApi.get('/', { params }).then(({ data }) => data);
};

export const getCompany = id =>
  companiesApi.get(`/${id}`).then(({ status, data }) => ({ status, data }));

export const getBranchList = (search = null, skip = 0, take = 20) => {
  const params = { skip, take, BranchNameFilter: search };
  return branchesApi.get('/', { params }).then(({ data }) => data);
};

export const getBranch = id => branchesApi.get(`/${id}`).then(({ data }) => ({ data }));
