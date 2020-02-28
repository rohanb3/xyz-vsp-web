import api from '@/services/branchesApi';
import { getBranchInfo } from '@/services/branchesRepository';

xdescribe('branchesRepository', () => {
  xdescribe('getBranchInfo', () => {
    it('should call api.get and return correct data', async () => {
      const id = '0e4a5c89-d3b0-42ba-bf68-e207391ce30c';
      const data = { status: 200, data: '123' };

      api.get = jest.fn(() => Promise.resolve({ status: 200, data }));

      const response = await getBranchInfo(id);

      expect(response).toEqual(data);
      expect(api.get).toHaveBeenCalledWith(`/${id}`);
    });
  });
});
