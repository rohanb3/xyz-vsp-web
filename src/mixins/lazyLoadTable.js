import { RESET_ITEMS } from '@/store/storage/mutationTypes';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { RESET_FILTERS } from '@/store/tables/mutationTypes';

export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.loadItems();
  },
  beforeDestroy() {
    this.resetItems();
    this.resetFilters();
  },
  computed: {
    storageData() {
      return this.$store.state.storage[this.tableName] || {};
    },
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    rows() {
      return this.storageData.items || [];
    },
    allItemsLoaded() {
      return this.storageData.allItemsLoaded;
    },
    totalItems() {
      return this.storageData.total;
    },
    filters() {
      return this.tableData.filters || {};
    },
    role() {
      return this.$store.getters.role;
    },
    applyingFilters() {
      return Boolean(this.tableData.applyingFilters);
    },
    usersDashboardStatistics() {
      return this.storageData.usersDashboardStatistics || {};
    },
  },
  methods: {
    checkAndLoadItems() {
      if (!this.allItemsLoaded) {
        this.loadMoreItems();
      }
    },
    loadItems() {
      this.loading = true;
      const data = { itemType: this.tableName, filters: this.filters };
      return this.$store.dispatch(LOAD_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
    loadMoreItems() {
      this.loading = true;
      const data = { itemType: this.tableName, filters: this.filters };
      return this.$store.dispatch(LOAD_MORE_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
    resetItems() {
      this.$store.commit(RESET_ITEMS, this.tableName);
    },
    applyFilters(...filters) {
      const data = {
        tableName: this.tableName,
        filters,
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
    resetFilters() {
      this.$store.commit(RESET_FILTERS, this.tableName);
    },
    onFiltersApplied(arrayFilters) {
      this.applyFilters(...arrayFilters);
    },
  },
};
