/* eslint-disable import/first */

jest.mock('@/services/repository');

import getters from '@/store/storage/getters';

import * as dateHelper from '@/services/dateHelper';

dateHelper.filterByDateRange = jest.fn(() => []);

describe('storage getters: ', () => {
  describe('callsInDateRange: ', () => {
    it('should load customers', () => {
      const calls = [{ date: '2018-12-31' }];
      const range = { startDate: '2018-12-30', endDate: '2018-12-31' };

      const result = getters.callsInDateRange({ calls }, { callsTableDateRange: range });

      expect(result).toEqual([]);
      expect(dateHelper.filterByDateRange).toHaveBeenCalledWith(calls, range);
    });
  });
});
