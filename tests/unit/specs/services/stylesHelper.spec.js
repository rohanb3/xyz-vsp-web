import { getInitials } from '@/services/stylesHelper';

describe('stylesHelper', () => {
  describe('getInitials', () => {
    it('should return empty string if params absent', () => {
      expect(getInitials()).toBe('');
    });

    it('should return empty string if params has incorrect types', () => {
      expect(getInitials({}, [])).toBe('');
    });

    it('should return only first letter of firstName if lastName is absent', () => {
      expect(getInitials('George')).toBe('G');
    });

    it('should return only first letter of lastName if firstName is empty string', () => {
      expect(getInitials('', 'Smith')).toBe('S');
    });

    it('should return correct initials if all params is present', () => {
      expect(getInitials('George', 'Smith')).toBe('GS');
    });
  });
});
