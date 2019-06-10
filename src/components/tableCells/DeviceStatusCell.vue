<template>
  <div class='device-status-cell' :class="{ 'device-online': item.isOnline, 'device-oflline': !item.isOnline }">
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
      return this.item.isOnline ? 'Online' : 'Offline';
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
