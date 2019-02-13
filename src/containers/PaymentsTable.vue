<template>
  <configurable-lazy-load-table displayName="payments" :name="name"></configurable-lazy-load-table>
</template>

<script>
import ConfigurableLazyLoadTable from './ConfigurableLazyLoadTable';

import { PAYMENTS_TABLE } from '@/constants/tablesNames';

export default {
  name: 'PaymentsTable',
  components: {
    ConfigurableLazyLoadTable,
  },
  data() {
    return {
      name: PAYMENTS_TABLE,
    };
  },
};
</script>
