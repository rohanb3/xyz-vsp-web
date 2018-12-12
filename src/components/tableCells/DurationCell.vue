<template>
  <div class='duration-cell'>
    <human-duration :duration="duration" />
  </div>
</template>

<script>
import HumanDuration from '@/components/HumanDuration';

export default {
  name: 'DurationCell',
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
