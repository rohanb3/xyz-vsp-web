import qs from 'qs';
import { paramsSerializer } from '@/services/repositoryUtils';

xdescribe('repositoryUtils', () => {
  xdescribe('paramsSerializer', () => {
    it('should return formatted string if passed parameters', () => {
      qs.stringify = jest.fn();
      const options = { skipNulls: true, arrayFormat: 'repeat' };
      const paramList = {};

      paramsSerializer(paramList);

      expect(qs.stringify).toHaveBeenCalledWith(paramList, options);
    });
  });
});
