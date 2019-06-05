<template>
  <div>{{storageData}}u</div>
</template>


<script>
import QuickSearch from '@/components/QuickSearch';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';

import { ENTITY_TYPES } from '@/constants';

export default {
  name: "QuickSearchFilter",
  mixins: [tableFilterAutocomplete],
  components: {
    QuickSearch,
  },
  mounted() {
    this.loadItems();
  },
  computed: {
   /* tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },*/
    storageData() {
      return this.$store.state.storage[this.entityName] || {};
    },
    loadItems() {
      this.loading = true;
      const data = { itemType: this.entityName, filters: {} };
      return this.$store.dispatch(LOAD_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
  },
  data() {
    return {
      loading: false,
      SearchFilter:'',
      entityName: ENTITY_TYPES.COMPANY_LIST,
    }
  }
}
</script>
