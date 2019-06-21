<template>
  <div class='device-id-cell'>
    <span v-if="item.isPending">{{ item.id }}</span>
    <a
      v-else
      href="#"
      @click.prevent.stop="$emit('deviceIdSelected', item.id)"
    >{{ item.id }}</a>
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
