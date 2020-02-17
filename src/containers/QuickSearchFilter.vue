<template>
  <div class="filter-wrapper">
    <quick-search
      class="quick-search"
      :placeholder="placeholder"
      @input="handleQuickSearchInput"
    />
  </div>
</template>

<script>
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { FILTER_NAMES } from '@/constants';
import QuickSearch from '../components/QuickSearchFilter';

export default {
  name: 'QuickSearchFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default() {
        return '';
      },
    },
  },
  components: { QuickSearch },
  methods: {
    handleQuickSearchInput(searchPhrase) {
      const filterName = {
        name: FILTER_NAMES.SEARCH,
        value: searchPhrase,
      };
      this.applyFilter(filterName);
    },
    applyFilter(...filters) {
      const data = {
        tableName: this.tableName,
        filters,
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
  },
};
</script>

<style scoped>
</style>
