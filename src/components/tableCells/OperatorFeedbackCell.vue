<template>
  <div
    class='operator-feedback-cell'
    @click.stop="onClick">
    <call-feedback-icon
      :feedback="feedback"
      :color="color" />
  </div>
</template>

<script>
import CallFeedbackIcon from '@/components/CallFeedbackIcon';

export default {
  name: 'OperatorFeedbackCell',
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    CallFeedbackIcon,
  },
  computed: {
    feedback() {
      return this.item.operatorFeedback;
    },
    color() {
      return this.feedback.note ? '#398ffb' : null;
    },
  },
  methods: {
    onClick() {
      this.$emit('operatorFeedbackClick', this.item.id);
    },
  },
};
</script>

<style scoped lang="scss">
.operator-feedback-cell {
  cursor: pointer;
}
</style>
