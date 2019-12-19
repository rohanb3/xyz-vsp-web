<template>
  <div class="filter-wrapper">
    <table-filter
      name="name"
      boundaries-selector=".device-management-table"
      :title="$t('tenant')"
      :items="tenantList"
      @select="toggleItem"
      @selectAll="onSelectAllItemDisplayed"
      @clearAll="onClearAllItemDisplayed"
      @notFound="onNotFoundCompany"
    >
      <table-loader v-if="loading" slot="loader" />
    </table-filter>
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import TableLoader from '@/components/TableLoader';
import { getTenantList, getTenant } from '@/services/getRepository';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'TenantFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
    sendFieldName: {
      type: String,
      default: 'id',
    },
  },
  components: {
    TableFilter,
    TableLoader,
  },
  mixins: [tableFilterAutocomplete],
  data() {
    return {
      filterName: FILTER_NAMES.FILTER_TENANT_IDS,
      [FILTER_NAMES.FILTER_TENANT_IDS]: [],
    };
  },
  mounted() {
    this.loadTenantList();
  },
  computed: {
    tenantList() {
      return this[this.filterName];
    },
  },
  methods: {
    loadTenantList() {
      this.loading = true;
      getTenantList()
        .then(data => {
          this[this.filterName] = data;
          return this.loadingPreselectedItems({
            displayedFieldName: 'name',
            getItemById: getTenant,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onNotFoundCompany({ itemKey, searchField }) {
      this.onNotFoundItem({
        itemKey,
        searchField,
        getItemList: getTenantList,
      });
    },
  },
};
</script>
