<template>
  <div
    class='call-type-cell'>
    <span>{{ type }}</span>
  </div>
</template>

<script>
export default {
  name: 'CallTypeCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    type() {
      return this.$t(this.item.type);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
