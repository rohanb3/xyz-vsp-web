import api from '@/services/publicApi';
import { getBranches, getCompanies } from '@/services/publicApiRepository';
import {
  FILTER_NAMES_COMPANY_LIST,
  COMPANY_LIST_COLUMNS_SORTED,
  SORTING_DIRECTION,
} from '@/constants';

xdescribe('publicApiRepository', () => {
  xdescribe('getBranches', () => {
    it('should call api.get and return data', async () => {
      const companyId = 1;
      const keyword = 'keyword';

      const params = { BranchNameFilter: keyword };
      const data = {
        branches: [],
      };

      api.get = jest.fn(() => Promise.resolve({ data }));
      const result = await getBranches(companyId, keyword);

      expect(api.get).toHaveBeenCalledWith(`/company/${companyId}/branch`, { params });
      expect(result).toEqual(data);
    });
  });
  xdescribe('getCompanies', () => {
    it('should call api.get and return data', async () => {
      const filters = {};
      const params = {
        ...filters,
        [FILTER_NAMES_COMPANY_LIST.SORT_BY]: COMPANY_LIST_COLUMNS_SORTED.COMPANY_NAME,
        [FILTER_NAMES_COMPANY_LIST.TAKE]: 30,
        [FILTER_NAMES_COMPANY_LIST.SORT_ORDER]: SORTING_DIRECTION.ASC,
      };

      const data = {
        companies: [],
      };

      api.get = jest.fn(() => Promise.resolve({ data }));
      const result = await getCompanies(filters);

      expect(api.get).toHaveBeenCalledWith('/company', { params });
      expect(result).toEqual(data);
    });
  });
});
