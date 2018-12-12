<template>
  <div class='client-feedback-cell'>
    <call-feedback-icon
      :feedback="feedback"
      :color="color" />
  </div>
</template>

<script>
import CallFeedbackIcon from '@/components/CallFeedbackIcon';

export default {
  name: 'ClientFeedbackCell',
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
      return this.item.clientFeedback;
    },
    color() {
      return this.feedback && this.feedback.message ? '#ff941b' : null;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
