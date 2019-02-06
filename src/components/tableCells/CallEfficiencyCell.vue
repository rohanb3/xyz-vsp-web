<template>
  <div
    class='call-efficiency-cell'
    :class="mark"
    >
      {{efficiency}}
  </div>
</template>

<script>
const FAST_LOW_CAP = 90;

export default {
  name: 'CallEfficiencyCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    efficiency() {
      return `${this.item.efficiency} %`;
    },
    mark() {
      return this.item.efficiency >= FAST_LOW_CAP ? 'fast' : 'slow';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.call-efficiency-cell {
  &:before {
    content: '';
    display: inline-block;
    margin-right: 9px;
    width: 9px;
    height: 9px;
    border-radius: 2px;
    background: transparent;
  }
  &.slow {
    &:before {
      background: #ff941b;
    }
  }

  &.fast {
    &:before {
      background: #7ed321;
    }
  }
}
</style>
