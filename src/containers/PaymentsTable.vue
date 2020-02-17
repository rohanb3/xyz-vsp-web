<template>
  <configurable-lazy-load-table displayName="payments" :name="name">
    <slot slot="header" name="header"/>
  </configurable-lazy-load-table>
</template>

<script>
import { ENTITY_TYPES } from '@/constants';
import ConfigurableLazyLoadTable from './ConfigurableLazyLoadTable';

export default {
  name: 'PaymentsTable',
  components: {
    ConfigurableLazyLoadTable,
  },
  data() {
    return {
      name: ENTITY_TYPES.PAYMENTS,
    };
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

.payments-table {
  .call-next_monthly_payment {
    .column-date {
      font-weight: bold;
    }
  }
}
</style>
