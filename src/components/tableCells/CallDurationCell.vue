<template>
  <div
    class='call-duration-cell'
    :class="mark"
    >
    <formatted-duration :duration="callDuration" />
  </div>
</template>

<script>
import FormattedDuration from '@/components/FormattedDuration';

const FAST_TOP_CAP = 30;
const SLOW_LOW_CAP = 120;

export default {
  name: 'CallDurationCell',
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
  },
  components: {
    FormattedDuration,
  },
  computed: {
    type() {
      return this.column.field;
    },
    callDuration() {
      return parseFloat(this.item[this.type]);
    },
    mark() {
      if (this.type !== 'average') return null;
      // eslint-disable-next-line no-nested-ternary
      return this.callDuration <= FAST_TOP_CAP
        ? 'fast'
        : this.callDuration >= SLOW_LOW_CAP
          ? 'slow'
          : '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.call-duration-cell {
  color: #4a4a4a;

  &.fast {
    color: $operators-table-wrap-up-time-cell-fast-color;
  }

  &.slow {
    color: $operators-table-wrap-up-time-cell-slow-color;
  }
}
</style>
