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
      const { operatorFeedback = {} } = this.item;
      return operatorFeedback.callType ? this.$t(operatorFeedback.callType) : '-';
    },
  },
};
</script>

<style scoped lang="scss">
</style>
