import api from '@/services/companiesApi';
import locationApi from '@/services/locationApi';
import branchesApi from '@/services/branchesApi';
import {
  getCompanyList,
  getStateList,
  getCityList,
  getCompany,
  getBranchList,
  getBranch,
} from '@/services/getRepository';
import { RESPONSE_STATUSES } from '@/constants';

xdescribe('geoRepository', () => {
  xdescribe('getCompanyList', () => {
    it('should call api.get and return corect data', async () => {
      const data = { id: '777' };
      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCompanyList();
      const params = { skip: 0, take: 20, SearchFilter: null };

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith('/', { params });
    });

    it('should call getCompanyList with parametr and return corect data', async () => {
      const data = { id: '777' };
      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCompanyList('lol');
      const params = { skip: 0, take: 20, SearchFilter: 'lol' };

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith('/', { params });
    });

    it('should call getCompanyList with 3 parametrs and return corect data', async () => {
      const data = { id: '777' };
      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCompanyList('lol', 7, 8);
      const params = { skip: 7, take: 8, SearchFilter: 'lol' };

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith('/', { params });
    });
  });

  xdescribe('getStateList', async () => {
    it('should call getStateList and return corect data', async () => {
      const data = { id: '777' };
      locationApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getStateList();

      expect(response).toEqual(data);
      expect(locationApi.get).toHaveBeenCalledWith('/state');
    });
  });

  xdescribe('getCityList', async () => {
    it('should call getCityList and return corect data', async () => {
      const data = { id: '777' };
      locationApi.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCityList();

      expect(response).toEqual(data);
      expect(locationApi.get).toHaveBeenCalledWith('/city');
    });
  });

  xdescribe('getCompany', async () => {
    it('should call getCompany and return corect data', async () => {
      const id = '132';
      const data = { data: { id: '777' }, status: RESPONSE_STATUSES.OK };
      api.get = jest.fn(() => Promise.resolve(data));

      const response = await getCompany(id);

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith(`/${id}`);
    });
  });
  xdescribe('getBranchList', () => {
    it('should call branchesApi.get and return data', async () => {
      const skip = 0;
      const take = 20;
      const search = 'search';

      const params = { skip, take, BranchNameFilter: search };
      const data = { skip, take, BranchNameFilter: search };

      branchesApi.get = jest.fn(() => Promise.resolve({ data }));
      await getBranchList(search, skip, take);

      expect(branchesApi.get).toHaveBeenCalledWith('/', { params });
    });
  });
  xdescribe('getBranch', () => {
    it('should call branchesApi.get and return data', async () => {
      const id = 1;
      const name = 'branch #1';

      const data = { id, name };

      branchesApi.get = jest.fn(() => Promise.resolve({ data }));
      const result = await getBranch(id);

      expect(branchesApi.get).toHaveBeenCalledWith(`/${id}`);
      expect(result).toEqual({ data });
    });
  });
});
