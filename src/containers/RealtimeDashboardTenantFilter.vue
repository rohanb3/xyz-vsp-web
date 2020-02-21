<template>
  <div class="filter-wrapper">
    <div>Selected: {{selectedTenant}}</div>
    <select v-if="!loading"
            v-model="selectedTenant">
      <option v-for="tenant in tenantsList" :value="tenant.id">{{tenant.name}}</option>
    </select>
    <table-loader v-if="loading" slot="loader" />
  </div>
</template>

<script>
import { loadTenantsList, changeTenant } from '@/services/realtimeDashboard';
import TableLoader from '@/components/TableLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'RealtimeDashboardTenantFilter',
  components: {
    TableLoader
  },
  data() {
    return {
      tenants: [],
    }
  },
  watch: {
    selectedTenant: function(val) {
      changeTenant(val);
    },
  },
  mounted() {
    loadTenantsList();
  },
  computed: {
    ...mapGetters(['tenantsList', 'tenantId']),
    selectedTenant: {
      set(val) {
        changeTenant(val);
      },
      get() {
        return this.tenantId;
      },

    },
    loading() {
        return !this.tenantsList || (this.tenantsList && !this.tenantsList.length);
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
