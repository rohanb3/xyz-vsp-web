<template>
  <div class='device-udid-cell'>
    <a
      v-if="item.isPending"
      href="#"
      @click.prevent.stop="$emit('pendingDeviceSelected', item.id)"
    >{{ item.udid }}</a>
    <a
      v-else
      href="#"
      @click.prevent.stop="$emit('deviceIdSelected', item.id)">{{ item.udid }}</a>
  </div>
</template>

<script>
export default {
  name: 'DeviceUdidCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>
