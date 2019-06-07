<template>
  <div class='device-location-cell'>
    <span
      class="location-badge"
      :class="{ 'in-location': item.isInLocation, 'out-of-location': !item.isInLocation }"
    />
    {{ location }}
  </div>
</template>

<script>
export default {
  name: 'DeviceLocationCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    location() {
      return this.item.isInLocation ? 'In location' : 'Out of location';
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
