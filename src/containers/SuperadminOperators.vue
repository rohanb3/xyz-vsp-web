<template>
  <ConfigurableLazyLoadTable
    displayName="operators"
    :name="name"
    :selectedId="selectedOperator"
    :handleCellClick="showOperatorDetails"
  >
    <OperatorDetailsCard
      slot="drawer"
      v-if="operatorDetailsShown"
      :operatorId="selectedOperator"
      @close="closeOperatorDetails"
    />
  </ConfigurableLazyLoadTable>
</template>

<script>
import ConfigurableLazyLoadTable from './ConfigurableLazyLoadTable';
import OperatorDetailsCard from '@/containers/OperatorDetailsCard';

import { SUPERADMIN_OPERATORS_TABLE } from '@/store/tables/constants';

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
