<template>
  <div class='operator-feedback-cell'>
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
      return this.feedback && this.feedback.message ? '#398ffb' : null;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
