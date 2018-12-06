<template>
  <div class="customers-page">
    <customers-table class="customers-table" />
  </div>
</template>

<script>
import CustomersTable from '@/containers/CustomersTable';

export default {
  name: 'CustomersList',
  components: {
    CustomersTable,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.customers-page {
  padding: $customers-list-padding;
}

.customers-table {
  // height: calc(100vh - #{$header-height} - (2 * $customers-list-padding));
}
</style>
