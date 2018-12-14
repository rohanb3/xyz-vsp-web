import { secondsToHuman } from '@/services/dateHelper';

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
});
