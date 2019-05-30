<template>
  <div class="default-header-cell">
    <span>{{ $t(column.title) }}</span>
  </div>
</template>

<script>
export default {
  name: 'DefaultHeaderCell',
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.default-header-cell {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
