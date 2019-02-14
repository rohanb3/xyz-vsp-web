<template>
  <div class="dollars-cell">
    <span>$</span>
    <span class="amount">{{ item.amount }}</span>
  </div>
</template>

<script>
export default {
  name: 'DollarsCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.amount {
  font-weight: bold;
  margin-left: 5px;
}
</style>
