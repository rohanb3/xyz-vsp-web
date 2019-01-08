<template>
  <div class='id-cell'>
    <span>{{ item.id }}</span>
  </div>
</template>

<script>
export default {
  name: 'IdCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.id-cell {
  font-size: 12px;
  color: $operators-table-id-cell-color;
}
</style>
