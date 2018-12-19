import { secondsToHuman, filterByDateRange } from '@/services/dateHelper';

describe('dateHelper', () => {
  describe('secondsToHuman', () => {
    it('should return "00:00:00" if no value was passed', () => {
      expect(secondsToHuman()).toBe('00:00:00');
    });

    it('should return "00:00:00" if 0 was passed', () => {
      expect(secondsToHuman(0)).toBe('00:00:00');
    });

    it('should return "00:00:42" if 42 was passed', () => {
      expect(secondsToHuman(42)).toBe('00:00:42');
    });

    it('should return "00:01:42" if 102 was passed', () => {
      expect(secondsToHuman(102)).toBe('00:01:42');
    });

    it('should return "01:01:01" if 3661 was passed', () => {
      expect(secondsToHuman(3661)).toBe('01:01:01');
    });

    it('should return "25:01:01" if 90061 was passed', () => {
      expect(secondsToHuman(90061)).toBe('25:01:01');
    });
  });

  describe('filterByDateRange', () => {
    let data = null;

    beforeEach(() => {
      data = [
        { date: '2018-12-10T00:00:00Z' },
        { date: '2018-12-11T00:00:00Z' },
        { date: '2018-12-12T00:00:00Z' },
        { date: '2018-12-13T00:00:00Z' },
        { date: '2018-12-14T00:00:00Z' },
      ];
    });

    it('should return [] if data is an empty array', () => {
      const range = {
        startDate: '2018-12-18T00:00:00Z',
        endDate: '2018-12-19T00:00:00Z',
      };
      expect(filterByDateRange([], range)).toEqual([]);
    });

    describe('no startDate, no endDate', () => {
      it('should return all data, if both startDate and endDate in range are missing ', () => {
        expect(filterByDateRange(data, {})).toEqual(data);
      });
    });

    describe('only startDate', () => {
      it('startDate is before earliest date in all data', () => {
        const range = {
          startDate: '2018-12-09T00:00:00Z',
        };

        expect(filterByDateRange(data, range)).toEqual(data);
      });

      it('startDate is equal earliest date in all data', () => {
        const range = {
          startDate: '2018-12-10T00:00:00Z',
        };

        expect(filterByDateRange(data, range)).toEqual(data);
      });

      it('startDate is between earliest and latest date in all data', () => {
        const range = {
          startDate: '2018-12-11T00:00:00Z',
        };

        const expectedResult = [
          { date: '2018-12-11T00:00:00Z' },
          { date: '2018-12-12T00:00:00Z' },
          { date: '2018-12-13T00:00:00Z' },
          { date: '2018-12-14T00:00:00Z' },
        ];

        expect(filterByDateRange(data, range)).toEqual(expectedResult);
      });

      it('startDate is equal to latest date in all data', () => {
        const range = {
          startDate: '2018-12-14T00:00:00Z',
        };

        const expectedResult = [{ date: '2018-12-14T00:00:00Z' }];

        expect(filterByDateRange(data, range)).toEqual(expectedResult);
      });

      it('startDate is after latest date in all data', () => {
        const range = {
          startDate: '2018-12-15T00:00:00Z',
        };

        const expectedResult = [];

        expect(filterByDateRange(data, range)).toEqual(expectedResult);
      });
    });

    describe('only endDate', () => {
      it('endDate is before earliest date in all data', () => {
        const range = {
          endDate: '2018-12-09T00:00:00Z',
        };

        expect(filterByDateRange(data, range)).toEqual([]);
      });

      it('endDate is equal earliest date in all data', () => {
        const range = {
          endDate: '2018-12-10T00:00:00Z',
        };
        const expectedResult = [{ date: '2018-12-10T00:00:00Z' }];

        expect(filterByDateRange(data, range)).toEqual(expectedResult);
      });

      it('endDate is between earliest and latest date in all data', () => {
        const range = {
          endDate: '2018-12-11T00:00:00Z',
        };

        const expectedResult = [{ date: '2018-12-10T00:00:00Z' }, { date: '2018-12-11T00:00:00Z' }];

        expect(filterByDateRange(data, range)).toEqual(expectedResult);
      });

      it('endDate is equal to latest date in all data', () => {
        const range = {
          endDate: '2018-12-14T00:00:00Z',
        };

        expect(filterByDateRange(data, range)).toEqual(data);
      });

      it('endDate is after latest date in all data', () => {
        const range = {
          endDate: '2018-12-15T00:00:00Z',
        };

        expect(filterByDateRange(data, range)).toEqual(data);
      });
    });

    describe('startDate and endDate exist', () => {
      it('startDate and endDate range includes all dates in data', () => {
        const range = {
          startDate: '2018-12-09T00:00:00Z',
          endDate: '2018-12-19T00:00:00Z',
        };

        expect(filterByDateRange(data, range)).toEqual(data);
      });

      it('startDate is equal to earliest date in data and endDate is equal to latest date', () => {
        const range = {
          startDate: '2018-12-10T00:00:00Z',
          endDate: '2018-12-14T00:00:00Z',
        };

        expect(filterByDateRange(data, range)).toEqual(data);
      });

      it('startDate and endDate inside dates range in data', () => {
        const range = {
          startDate: '2018-12-12T00:00:00Z',
          endDate: '2018-12-13T00:00:00Z',
        };

        const expectedResult = [{ date: '2018-12-12T00:00:00Z' }, { date: '2018-12-13T00:00:00Z' }];

        expect(filterByDateRange(data, range)).toEqual(expectedResult);
      });

      it('startDate and endDate before dates range in data', () => {
        const range = {
          startDate: '2018-11-09T00:00:00Z',
          endDate: '2018-12-02T00:00:00Z',
        };
        expect(filterByDateRange(data, range)).toEqual([]);
      });

      it('startDate and endDate after dates range in data', () => {
        const range = {
          startDate: '2018-12-20T00:00:00Z',
          endDate: '2018-12-31T00:00:00Z',
        };
        expect(filterByDateRange(data, range)).toEqual([]);
      });
    });
  });
});
