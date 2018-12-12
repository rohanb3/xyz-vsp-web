<template>
  <div
    class='wait-time-cell'
    :class="{ overwaited: overwaited }">
    <human-duration :duration="duration" />
  </div>
</template>

<script>
import HumanDuration from '@/components/HumanDuration';

const OVERWAITED_DURATION = 120;

export default {
  name: 'WaitTimeCell',
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    HumanDuration,
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
