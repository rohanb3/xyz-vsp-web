import { SET_COLUMNS, RESET_COLUMNS, SHOW_COLUMN, HIDE_COLUMN } from '@/store/tables/mutationTypes';

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
    onColumnVisibilityChanged({ name, value }) {
      const mutation = value ? SHOW_COLUMN : HIDE_COLUMN;
      this.$store.commit(mutation, {
        tableName: this.tableName,
        columnName: name,
      });
    },
    setDefaultColumns() {
      this.$store.commit(RESET_COLUMNS, this.tableName);
    },
  },
};
