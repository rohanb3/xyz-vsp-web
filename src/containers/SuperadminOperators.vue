<template>
  <LazyLoadingTable
    displayName="operators"
    :name="name"
    :selectedId="selectedOperator"
    :handleCellClick="showOperatorDetails"
  >
    <OperatorDetailsCard
      v-if="operatorDetailsShown"
      :operatorId="selectedOperator"
      @close="closeOperatorDetails"
    />
  </LazyLoadingTable>
</template>

<script>
import LazyLoadingTable from './LazyLoadingTable/LazyLoadingTable';
import OperatorDetailsCard from '@/containers/OperatorDetailsCard';

import { SUPERADMIN_OPERATORS_TABLE } from '@/store/tables/constants';

export default {
  name: 'SuperadminOperators',
  components: {
    LazyLoadingTable,
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
