import { SET_COLUMNS } from '@/store/tables/mutationTypes';

export default {
  data() {
    return {
      tableName: 'default',
    };
  },
  computed: {
    columns() {
      return [];
    },
  },
  methods: {
    onColumnsResized(data) {
      const updatedColumns = this.columns.map(column => {
        const updated = { ...column };
        if (data[column.name]) {
          updated.width = data[column.name];
        }
        return updated;
      });

      this.$store.commit(SET_COLUMNS, {
        tableName: this.tableName,
        columns: updatedColumns,
      });
    },
    onColumnsReordered(columns) {
      this.$store.commit(SET_COLUMNS, {
        tableName: this.tableName,
        columns,
      });
    },
  },
};
