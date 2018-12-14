<template>
  <div
    class='wait-time-cell'
    :class="{ overwaited: overwaited }">
    <formatted-duration :duration="duration" />
  </div>
</template>

<script>
import FormattedDuration from '@/components/FormattedDuration';

const OVERWAITED_DURATION = 120;

export default {
  name: 'WaitTimeCell',
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
      return this.item.waitTime;
    },
    overwaited() {
      return this.duration > OVERWAITED_DURATION;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.wait-time-cell {
  color: $calls-duration-normal-color;

  &.overwaited {
    color: $calls-duration-overwaited-color;
  }
}
</style>
