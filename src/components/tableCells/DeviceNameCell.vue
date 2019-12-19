<template>
  <div class='device-name-cell'>
    <a
      v-if="item.isPending"
      href="#"
      @click.prevent.stop="$emit('pendingDeviceSelected', item.id)"
    >{{ item.udid }}</a>
    <a
      v-else
      href="#"
      @click.prevent.stop="$emit('deviceIdSelected', item.id)">{{ item.deviceName }}</a>
  </div>
</template>

<script>
export default {
  name: 'DeviceNameCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>
