import api from '@/services/companiesApi';
import locationApi from '@/services/locationApi';
import { getCompanyList, getStateList, getCityList, getCompany } from '@/services/getRepository';
import { RESPONSE_STATUSES } from '@/constants';

describe('geoRepository', () => {
  describe('getCompanyList', () => {
    it('should call api.get and return corect data', async () => {
      const data = { id: '777' };
      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCompanyList();
      const params = { offset: 0, limit: 20, CompaniesSearchPhrase: null };

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith('/', { params });
    });

    it('should call getCompanyList with parametr and return corect data', async () => {
      const data = { id: '777' };
      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCompanyList('lol');
      const params = { offset: 0, limit: 20, CompaniesSearchPhrase: 'lol' };

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith('/', { params });
    });

    it('should call getCompanyList with 3 parametrs and return corect data', async () => {
      const data = { id: '777' };
      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCompanyList('lol', 7, 8);
      const params = { offset: 7, limit: 8, CompaniesSearchPhrase: 'lol' };

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith('/', { params });
    });
  });

  describe('getStateList', async () => {
    it('should call getStateList and return corect data', async () => {
      const data = { id: '777' };
      locationApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getStateList();

      expect(response).toEqual(data);
      expect(locationApi.get).toHaveBeenCalledWith('/state');
    });
  });

  describe('getCityList', async () => {
    it('should call getCityList and return corect data', async () => {
      const data = { id: '777' };
      locationApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCityList();

      expect(response).toEqual(data);
      expect(locationApi.get).toHaveBeenCalledWith('/city');
    });
  });

  describe('getCompany', async () => {
    it('should call getCompany and return corect data', async () => {
      const id = '132';
      const data = { data: { id: '777' }, status: RESPONSE_STATUSES.OK };
      api.get = jest.fn(() => Promise.resolve(data));

      const response = await getCompany(id);

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith(`/${id}`);
    });
  });
});
