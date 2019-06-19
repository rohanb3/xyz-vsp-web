<template>
  <div class='device-udid-cell'>
    <a
      v-if="item.isPending"
      href="#"
      @click.prevent.stop="$emit('pendingDeviceSelected', item.id)"
    >{{ item.udid }}</a>
    <span v-else>{{ item.udid }}</span>
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
