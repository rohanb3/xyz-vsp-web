import qs from 'qs';
import { paramsSerializer } from '@/services/repositoryUtils';

describe('repositoryUtils', () => {
  describe('paramsSerializer', () => {
    it('should return formatted string if passed parameters', () => {
      qs.stringify = jest.fn();
      const options = { skipNulls: true, arrayFormat: 'repeat' };
      const paramList = {};

      paramsSerializer(paramList);

      expect(qs.stringify).toHaveBeenCalledWith(paramList, options);
    });
  });
});
