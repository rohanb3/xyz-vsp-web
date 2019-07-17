<template>
  <div class='device-id-cell'>
    <span>{{ item.id }}</span>
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
