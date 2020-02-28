import {
  secondsToHuman,
  filterByDateRange,
  secondsToMinutesSeconds,
  secondsToHoursMinutes,
  secondToMinutes,
  secondsToHoursMinutesSeconds,
} from '@/services/dateHelper';

xdescribe('dateHelper', () => {
  xdescribe('secondsToHuman', () => {
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

  xdescribe('filterByDateRange', () => {
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

    xdescribe('no startDate, no endDate', () => {
      it('should return all data, if both startDate and endDate in range are missing ', () => {
        expect(filterByDateRange(data, {})).toEqual(data);
      });
    });

    xdescribe('only startDate', () => {
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

    xdescribe('only endDate', () => {
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

    xdescribe('startDate and endDate exist', () => {
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

  xdescribe('secondsToMinutesSeconds', () => {
    it('should return "" if no value was passed', () => {
      expect(secondsToMinutesSeconds()).toBe('');
    });

    it('should return "" if 0 was passed', () => {
      expect(secondsToMinutesSeconds(0)).toBe('');
    });

    it('should return "1s" if 1 was passed', () => {
      expect(secondsToMinutesSeconds(1)).toBe('1s');
    });

    it('should return "1m 2s" if 62 was passed', () => {
      expect(secondsToMinutesSeconds(62)).toBe('1m 2s');
    });

    it('should return "0m 0s" if 0 was passed and showZero is true', () => {
      expect(secondsToMinutesSeconds(0, true)).toBe('0m 0s');
    });

    it('should return "0m 1s" if 1 was passed and showZero is true', () => {
      expect(secondsToMinutesSeconds(1, true)).toBe('0m 1s');
    });

    it('should return "1m 0s" if 60 was passed and showZero is true', () => {
      expect(secondsToMinutesSeconds(60, true)).toBe('1m 0s');
    });
  });

  xdescribe('secondsToHoursMinutes', () => {
    it('should return "0h 00m" if no value was passed', () => {
      expect(secondsToHoursMinutes()).toBe('0h 00m');
    });

    it('should return "0h 00m" if 0 was passed', () => {
      expect(secondsToHoursMinutes(0)).toBe('0h 00m');
    });

    it('should return "0h 00m" if 1 was passed', () => {
      expect(secondsToHoursMinutes(1)).toBe('0h 00m');
    });

    it('should return "0h 02m" if 121 was passed', () => {
      expect(secondsToHoursMinutes(121)).toBe('0h 02m');
    });

    it('should return "6h 45m" if 24320 was passed', () => {
      expect(secondsToHoursMinutes(24320)).toBe('6h 45m');
    });
  });

  xdescribe('secondToMinutes', () => {
    it('should return null if no value was passed', () => {
      expect(secondToMinutes()).toBe(null);
    });

    it('should return "0 min" if 0 was passed', () => {
      expect(secondToMinutes(0)).toBe('0 min');
    });

    it('should return "0 min" if 1 was passed', () => {
      expect(secondToMinutes(1)).toBe('0 min');
    });

    it('should return "3 min" if 182 was passed', () => {
      expect(secondToMinutes(182)).toBe('3 min');
    });
  });

  xdescribe('secondsToHoursMinutesSeconds', () => {
    it('should return "0h 0m 0s" if no value was passed', () => {
      expect(secondsToHoursMinutesSeconds()).toBe('0h 0m 0s');
    });

    it('should return "0h 0m 0s" if 0 was passed', () => {
      expect(secondsToHoursMinutesSeconds(0)).toBe('0h 0m 0s');
    });

    it('should return "0h 0m 1s" if 1 was passed', () => {
      expect(secondsToHoursMinutesSeconds(1)).toBe('0h 0m 1s');
    });

    it('should return "0h 2m 0s" if 121 was passed', () => {
      expect(secondsToHoursMinutesSeconds(121)).toBe('0h 2m 1s');
    });

    it('should return "6h 45m 20s" if 24320 was passed', () => {
      expect(secondsToHoursMinutesSeconds(24320)).toBe('6h 45m 20s');
    });
  });
});
