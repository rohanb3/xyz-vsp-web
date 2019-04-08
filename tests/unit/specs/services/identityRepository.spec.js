import api from '@/services/identityApi';
import { getAvatar } from '@/services/identityRepository';
import * as utils from '@/services/utils';

describe('identityRepository', () => {
  describe('getAvatar', () => {
    it('should call api.get and return correct data', async () => {
      const id = '0e4a5c89-d3b0-42ba-bf68-e207391ce30c';
      const data = { status: 200, data: '123' };

      api.get = jest.fn(() => Promise.resolve({ status: 200, data: 'lol' }));
      utils.imageEncode = jest.fn(() => '123');

      const response = await getAvatar(id);

      expect(response).toEqual(data);
      expect(utils.imageEncode).toHaveBeenCalledWith('lol');
      expect(api.get).toHaveBeenCalledWith(`/users/${id}/avatar`, { responseType: 'arraybuffer' });
    });
  });
});
