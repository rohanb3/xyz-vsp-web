<template>
  <configurable-lazy-load-table
    displayName="operators"
    :name="name"
    :selectedId="selectedOperator"
    :handleCellClick="showOperatorDetails"
  >
    <operator-details-card
      slot="drawer"
      v-if="operatorDetailsShown"
      :operatorId="selectedOperator"
      @close="closeOperatorDetails"
    />
  </configurable-lazy-load-table>
</template>

<script>
import ConfigurableLazyLoadTable from './ConfigurableLazyLoadTable';
import OperatorDetailsCard from '@/containers/OperatorDetailsCard';

import { SUPERADMIN_OPERATORS_TABLE } from '@/constants/tablesNames';

export default {
  name: 'SuperadminOperators',
  components: {
    ConfigurableLazyLoadTable,
    OperatorDetailsCard,
  },
  data() {
    return {
      operatorDetailsShown: false,
      selectedOperator: null,
      name: SUPERADMIN_OPERATORS_TABLE,
    };
  },
  methods: {
    closeOperatorDetails() {
      this.operatorDetailsShown = false;
      this.selectedOperator = null;
    },
    showOperatorDetails(id) {
      this.operatorDetailsShown = true;
      this.selectedOperator = id;
    },
  },
};
</script>
