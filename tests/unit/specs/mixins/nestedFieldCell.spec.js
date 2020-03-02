import nestedFieldCell from '@/mixins/nestedFieldCell';

describe('nestedFieldCell mixin', () => {
  describe('fields', () => {
    it('should return correct array if delimiter presents', () => {
      const fakeThis = {
        column: { field: 'car.model' },
      };

      const expectedData = ['car', 'model'];

      const result = nestedFieldCell.computed.fields.call(fakeThis);

      expect(expectedData).toEqual(result);
    });

    it('should return correct array if no delimiter presents', () => {
      const fakeThis = {
        column: { field: 'carmodel' },
      };

      const expectedData = ['carmodel'];

      const result = nestedFieldCell.computed.fields.call(fakeThis);

      expect(expectedData).toEqual(result);
    });

    it('should return correct array if no field presents', () => {
      const fakeThis = {
        column: { field: null },
      };

      const expectedData = [];

      const result = nestedFieldCell.computed.fields.call(fakeThis);
      expect(expectedData).toEqual(result);
    });
  });

  describe('value', () => {
    it('should return correct string if fields coincide', () => {
      const fakeThis = {
        fields: ['car', 'model'],
        item: { car: { model: 'Tesla' } },
      };

      const expectedData = 'Tesla';
      const result = nestedFieldCell.computed.value.call(fakeThis);
      expect(expectedData).toEqual(result);
    });

    it('should return undefined if fields do not coincide', () => {
      const fakeThis = {
        fields: ['other', 'field'],
        item: { car: { model: 'Tesla' } },
      };

      const result = nestedFieldCell.computed.value.call(fakeThis);
      expect(result).toBeNull();
    });
  });
});
