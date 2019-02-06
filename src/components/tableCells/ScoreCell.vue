<template>
  <div class='score-cell'>
    <span>{{ item.score }}</span>
  </div>
</template>

<script>
export default {
  name: 'ScoreCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.score-cell {
  font-size: 14px;
  color: $operators-table-score-cell-color;
}
</style>
