<template>
  <div class='duration-cell' :class="{ 'too-long': tooLong, 'normal-duration': normalDuration }">
    <formatted-duration :duration="duration" />
  </div>
</template>

<script>
import FormattedDuration from '@/components/FormattedDuration';

const TOO_LONG_DURATION = 300;

export default {
  name: 'DurationCell',
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
      return this.item.duration;
    },
    normalDuration() {
      return this.duration && this.duration <= TOO_LONG_DURATION;
    },
    tooLong() {
      return this.duration > TOO_LONG_DURATION;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/mixins.scss';

.duration-cell {
  @include inactive-cell;
  &.too-long {
    color: $base-red;
  }
  &.normal-duration {
    color: $base-green-text;
  }
}
</style>
