<template>
  <div
    class='wrap-up-time-cell'
    :class="mark"
    >
    <formatted-duration :duration="duration" />
  </div>
</template>

<script>
import FormattedDuration from '@/components/FormattedDuration';

const FAST_TOP_CAP = 30;
const SLOW_LOW_CAP = 120;

export default {
  name: 'WrapUpTimeCell',
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    FormattedDuration,
  },
  computed: {
    duration() {
      return parseFloat(this.item.wrapUpTime);
    },
    mark() {
      // eslint-disable-next-line no-nested-ternary
      return this.duration <= FAST_TOP_CAP ? 'fast' : this.duration >= SLOW_LOW_CAP ? 'slow' : '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.wrap-up-time-cell {
  color: $operators-table-wrap-up-time-cell-color;

  &.fast {
    color: $operators-table-wrap-up-time-cell-fast-color;
  }

  &.slow {
    color: $operators-table-wrap-up-time-cell-slow-color;
  }
}
</style>
