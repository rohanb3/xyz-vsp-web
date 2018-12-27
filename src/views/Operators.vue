<template>
  <div class="operators-page">
    <operators-table/>
  </div>
</template>

<script>
import OperatorsTable from '@/containers/OperatorsTable';

export default {
  name: 'Operators',
  components: {
    OperatorsTable,
  },
};
</script>

<style lang="scss" scoped>
.operators-page {
  padding: 22px;
}
</style>
