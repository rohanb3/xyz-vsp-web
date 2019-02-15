<template>
  <div class="payments-page">
    <payments-table>
      <payments-header slot="header"/>
    </payments-table>
  </div>
</template>

<script>
import PaymentsTable from '@/containers/PaymentsTable';
import PaymentsHeader from '@/containers/PaymentsHeader';

export default {
  name: 'Payments',
  components: {
    PaymentsTable,
    PaymentsHeader,
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
