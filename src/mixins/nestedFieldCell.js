export default {
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
  },
  computed: {
    fields() {
      if (typeof this.column.field === 'string') {
        return this.column.field.split('.');
      }
      return [];
    },
    value() {
      try {
        return this.fields.reduce((acc, curr) => acc[curr], this.item);
      } catch (err) {
        return null;
      }
    },
  },
};
