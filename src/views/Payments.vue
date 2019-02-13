<template>
  <div class="payments-page">
    <payments-table/>
  </div>
</template>

<script>
import PaymentsTable from '@/containers/PaymentsTable';

export default {
  name: 'Payments',
  components: {
    PaymentsTable,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.payments-page {
  padding: $table-list-padding;
  height: 100%;
  overflow: auto;
}
</style>
