<template>
  <div class='active-call-duration-cell' :title="preparedValue">
    <vue-time-ticker :value="preparedValue" format="HOURS" />
  </div>
</template>

<script>
import VueTimeTicker from 'vue-time-ticker';

export default {
  name: 'ActiveCallDurationCell',
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  components: {
    VueTimeTicker,
  },
  computed: {
    preparedValue() {
      if (this.item.callbacks && this.item.callbacks.length !== 0) {
        return this.item.callbacks[this.item.callbacks.length - 1].acceptedAt;
      }
      return this.item.acceptedAt;
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
