<template>
  <div class='calls-cell' :class="{total: this.type === 'calls', positive: this.type === 'positive', negative: this.type === 'negative'}">
    <span>{{ calls }}</span>
  </div>
</template>

<script>
export default {
  name: 'CallsCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    type() {
      return this.$attrs.column.field;
    },
    calls() {
      return this.item[this.type].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.calls-cell {
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
