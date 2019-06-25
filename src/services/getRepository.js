import companiesApi from './companiesApi';
import locationApi from './locationApi';

export const getStateList = () => locationApi.get('/state').then(({ data }) => data);

export const getCityList = () => locationApi.get('/city').then(({ data }) => data);

export const getCompanyList = (search = null, offset = 0, limit = 20) => {
  const params = { offset, limit, CompaniesSearchPhrase: search };
  return companiesApi.get('/', { params }).then(({ data }) => data);
};

export const getCompany = id =>
  companiesApi.get(`/${id}`).then(({ status, data }) => ({ status, data }));
