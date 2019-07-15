<template>
  <div
    class='device-status-cell'
    :class="{ 'device-online': isDeviceOnline, 'device-oflline': !isDeviceOnline }"
  >
    {{ status }}
  </div>
</template>

<script>
export default {
  name: 'DeviceStatusSinceCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    status() {
      let message = 'offline';
      if (this.item.isOnline) {
        message = 'online';
      }
      if (this.item.isPending) {
        message = 'status.pending';
      }
      return this.$t(message);
    },
    isDeviceOnline() {
      return this.item.isOnline && !this.item.isPending;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.device-status-cell {
  &.device-oflline {
    color: $base-red;
  }
  &.device-online {
    color: $base-green-text;
  }
}
</style>
