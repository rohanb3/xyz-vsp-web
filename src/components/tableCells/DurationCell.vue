<template>
  <div class='duration-cell'>
    <formatted-duration :duration="duration" />
  </div>
</template>

<script>
import FormattedDuration from '@/components/FormattedDuration';

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
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/mixins.scss';

.duration-cell {
  @include inactive-cell;
}
</style>
