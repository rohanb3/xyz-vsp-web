<template>
  <div
    class='feedback-quality-cell'
    :class="`${type}-feedback`"
    >
      {{feedbacks}}
  </div>
</template>

<script>
export default {
  name: 'FeedbackQualityCell',
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
  },
  computed: {
    type() {
      return this.column.field;
    },
    feedbacks() {
      return this.item[this.type];
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.feedback-quality-cell {
  font-size: 14px;

  &.success-feedback {
    color: $base-green-text;
  }

  &.fail-feedback {
    color: $base-red;
  }
}
</style>
