<template>
  <div class="customers-page">
    <customers-table class="customers-table"/>
    <superadmin-companies-table class="superadmin-companies-table"/>
  </div>
</template>

<script>
import CustomersTable from '@/containers/CustomersTable';
import SuperadminCompaniesTable from '@/containers/SuperadminCompaniesTable';

export default {
  name: 'CustomersList',
  components: {
    CustomersTable,
    SuperadminCompaniesTable,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.customers-page {
  padding: $table-list-padding;
  height: 100%;
  overflow: auto;
}
.superadmin-companies-table {
  margin-top: 20px;
  background-color: white;
}
</style>
