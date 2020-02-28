import { extractPropertiesFromArrObj, getStringFromValuesByKey } from '@/services/utils';

xdescribe('utils', () => {
  xdescribe('extractPropertiesFromArrObj', () => {
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
  xdescribe('getStringFromValuesByKey: ', () => {
    it('should return empty string if passed empty itemKey', () => {
      const items = [
        { id: 1, name: 'Alabama', value: 'AL', selected: true },
        { id: 2, name: 'Alaska', value: 'AK' },
      ];

      const result = getStringFromValuesByKey('', items, 3);

      const expectedString = '';

      expect(result).toEqual(expectedString);
    });

    it('should return empty string if selectedItems is empty', () => {
      const items = [];

      const result = getStringFromValuesByKey('name', items, 3);

      const expectedString = '';

      expect(result).toEqual(expectedString);
    });

    it('should return empty string if item not found in the list', () => {
      const items = [{ id: 1, value: 'AL', selected: true }, { id: 4, value: 'AR' }];

      const result = getStringFromValuesByKey('name', items, 3);

      const expectedString = '';

      expect(result).toEqual(expectedString);
    });
  });
});
