<template>
  <div class="filter-wrapper">
    <div v-if="!loading"
         class="table-filter">
      <select v-model="selectedTenant">
        <option v-for="tenant in tenantsList"
                :key="tenant.id"
                :value="tenant.id">{{tenant.name}}</option>
      </select>
      <div slot="reference" class="datepicker-toggler">
        <div class="caret"></div>
      </div>
    </div>
    <table-loader v-else slot="loader" />
  </div>
</template>

<script>
import { loadTenantsList, changeTenant } from '@/services/realtimeDashboard';
import TableLoader from '@/components/TableLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'RealtimeDashboardTenantFilter',
  components: {
    TableLoader,
  },
  data() {
    return {
      tenants: [],
    };
  },
  mounted() {
    loadTenantsList();
  },
  computed: {
    ...mapGetters(['tenantsList', 'tenantId']),
    selectedTenant: {
      set(val) {
        changeTenant(val).then(data => {
          console.log('selectedTenant > changeTenant > data:', data);
        });
      },
      get() {
        return this.tenantId;
      },
    },
    loading() {
      return !this.tenantsList || !this.tenantsList.length;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.table-filter {
  height: 20px;
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 0 10px;
  border: 1px solid $table-toolbar-section-border-color;
  font-size: 12px;
  color: $table-toolbar-section-color;
  font-weight: 500;

  select {
    width: 150px;
    option {
      color: black;
    }
  }
}
.caret {
  border: 1px solid $base-blue;
  width: 7px;
  height: 7px;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  margin: -4px 0 0 5px;
}
</style>
