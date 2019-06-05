<template>
  <quick-search
    :items="items"
    name="companyName"
    :loading-items="loading"
    @input="loadItems"
    @loadMoreItems="loadMoreItems"
  />
</template>


<script>
import QuickSearch from '@/components/QuickSearch';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';

import { ENTITY_TYPES, FILTER_NAMES_COMPANY_LIST } from '@/constants';

export default {
  name: 'QuickSearchFilter',
  mixins: [tableFilterAutocomplete],
  components: {
    QuickSearch,
  },
  mounted() {
    this.loadItems();
  },
  computed: {
    items() {
      return this.$store.state.storage[this.entityName].items || [];
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
    loadMoreItems() {
      this.loading = true;
      const data = {
        itemType: this.entityName,
        filters: {
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
