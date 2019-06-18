<template>
  <div class='device-location-status-cell'>
    <span
      v-if="!isPending"
      class="location-badge"
      :class="{ 'in-location': isInLocation, 'out-of-location': !isInLocation }"
    />
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'DeviceLocationStatusCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    isInLocation() {
      return this.item.isOnline && this.item.isInLocation;
    },
    isPending() {
      return this.item.isPending;
    },
    title() {
      if (this.isPending) {
        return '';
      }
      const message = this.isInLocation ? 'in.location' : 'out.location';
      return this.$t(message);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.location-badge {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;

  &.in-location {
    background-color: $base-green-text;
  }
  &.out-of-location {
    background-color: $base-red;
  }
}
</style>
