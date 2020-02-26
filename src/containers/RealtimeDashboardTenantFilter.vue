<template>
  <div class="filter-wrapper">
    <table-loader v-if="loading" slot="loader" />
    <table-filter
      v-else
      :title="$t('tenant')"
      boundaries-selector=".device-management-table"
      :items="items"
      :useQuickBtn="false"
      :useSearchField="false"
      @select="onTenantChanged"
    />
  </div>
</template>

<script>
import { loadTenantsList, changeTenant } from '@/services/realtimeDashboard';
import TableLoader from '@/components/TableLoader';
import TableFilter from '@/components/TableFilter';
import { mapGetters } from 'vuex';

export default {
  name: 'RealtimeDashboardTenantFilter',
  components: {
    TableLoader,
    TableFilter,
  },
  mounted() {
    loadTenantsList();
  },
  computed: {
    ...mapGetters(['tenantsList', 'tenantId']),
    items() {
      return this.tenantsList.map(item => ({ ...item, selected: item.id === this.tenantId }));
    },
    loading() {
      return !this.tenantsList || !this.tenantsList.length;
    },
  },
  methods: {
    onTenantChanged(selectedInfo) {
      changeTenant(selectedInfo.itemKeyVal);
    },
  },
};
</script>
