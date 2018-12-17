<template>
  <div
    class='client-feedback-cell'
    @click="onClick"
  >
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
      return this.feedback.message ? '#ff941b' : null;
    },
  },
  methods: {
    onClick() {
      this.$emit('clientFeedbackClick', this.item.id);
    },
  },
};
</script>

<style scoped lang="scss">
.client-feedback-cell {
  cursor: pointer;
}
</style>
