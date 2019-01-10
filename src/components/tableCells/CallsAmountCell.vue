<template>
  <div class='calls-amount-cell' :class="{total: type === 'calls', positive: type === 'positive', negative: type === 'negative'}">
    <span>{{ calls }}</span>
  </div>
</template>

<script>
export default {
  name: 'CallsAmountCell',
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
  },
  computed: {
    type() {
      return this.column.field;
    },
    calls() {
      return new Intl.NumberFormat().format(this.item[this.type]);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.calls-amount-cell {
  font-size: 14px;
  color: $operators-table-calls-cell-color;

  &.total {
    font-weight: bold;
  }
  &.positive {
    color: $operators-table-positive-calls-cell-color;
  }
  &.negative {
    color: $operators-table-negative-calls-cell-color;
  }
}
</style>
