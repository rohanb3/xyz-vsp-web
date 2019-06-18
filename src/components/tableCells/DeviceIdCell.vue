<template>
  <div class='device-id-cell'>
    <span v-if="item.isPending">{{ item.udid }}</span>
    <a
      v-else
      href="#"
      @click.prevent.stop="$emit('deviceIdSelected', item.id)"
    >{{ item.udid }}</a>
  </div>
</template>

<script>
export default {
  name: 'DeviceIdCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>
