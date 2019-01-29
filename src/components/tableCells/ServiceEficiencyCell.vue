<template>
  <div
    class='service-efficiency-cell'
    :class="mark"
    >
      {{efficiency}}
  </div>
</template>

<script>
const GOOD_FROM = 90,
BAD_UNTIL = 60;

export default {
  name: 'CallEfficiencyCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    efficiency() {
      return `${this.item.serviceEfficiency} %`;
    },
    mark() {
      return this.item.serviceEfficiency >= GOOD_FROM ? 'good'
        : this.item.serviceEfficiency <= BAD_UNTIL ? 'bad' : 'normal';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.service-efficiency-cell {
  &:before {
    content: '';
    display: inline-block;
    margin-right: 9px;
    width: 9px;
    height: 9px;
    border-radius: 2px;
    background: transparent;
  }
  &.normal {
    &:before {
      background: $base-orange;
    }
  }

  &.good {
    &:before {
      background: $base-green;
    }
  }

  &.bad {
    &:before {
      background: $base-red;
    }
  }
}
</style>
