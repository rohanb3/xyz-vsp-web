<template>
  <quick-search
    :items="items"
    name="companyName"
    :loading-items="loading"
    @load="loadItems"
    @loadMoreItems="loadMoreItems"
    @select="item => this.$emit('select', item)"
  />
</template>

<script>
import QuickSearch from '@/components/QuickSearch';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';

import { ENTITY_TYPES, FILTER_NAMES_COMPANY_LIST } from '@/constants';

export default {
  name: 'CompanyQuickSearch',
  components: {
    QuickSearch,
  },
  mounted() {
    this.loadItems();
  },
  computed: {
    storageData() {
      return this.$store.state.storage[this.entityName] || {};
    },
    items() {
      return this.storageData.items || [];
    },
    total() {
      return this.items.length;
    },
  },
  methods: {
    loadItems(searchPhrase = '') {
      this.loading = true;
      const data = {
        itemType: this.entityName,
        filters: {
          [FILTER_NAMES_COMPANY_LIST.SEARCH_FILTER]: searchPhrase,
        },
      };
      return this.$store.dispatch(LOAD_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
    loadMoreItems(searchPhrase = '') {
      this.loading = true;
      const data = {
        itemType: this.entityName,
        filters: {
          [FILTER_NAMES_COMPANY_LIST.SEARCH_FILTER]: searchPhrase,
          [FILTER_NAMES_COMPANY_LIST.SKIP]: this.total,
        },
      };
      return this.$store.dispatch(LOAD_MORE_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
  },
  data() {
    return {
      loading: false,
      entityName: ENTITY_TYPES.COMPANY_LIST,
    };
  },
};
</script>
