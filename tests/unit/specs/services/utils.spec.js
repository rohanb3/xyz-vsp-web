import { extractPropertiesFromArrObj } from '@/services/utils';

describe('utils', () => {
  describe('extractPropertiesFromArrObj', () => {
    it('should return array id ', () => {
      const stateArray = [{ id: 1, name: 'Alabama' }, { id: 2, name: 'Alaska' }];

      const result = extractPropertiesFromArrObj(stateArray, ['id']);

      const expectedData = [1, 2];
      expect(expectedData).toEqual(result);
    });

    it('should return array id if dont pass second parametr', () => {
      const stateArray = [
        { id: 1, name: 'Alabama', selected: true },
        { id: 2, name: 'Alaska', selected: false },
      ];

      const result = extractPropertiesFromArrObj(stateArray);

      const expectedData = [1, 2];
      expect(result).toEqual(expectedData);
    });

    it('should return empty array if dont pass two parametr ', () => {
      const result = extractPropertiesFromArrObj();

      expect([]).toEqual(result);
    });
  });
});
