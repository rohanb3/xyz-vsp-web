<template>
  <div
    class='client-feedback-cell'
    @click.stop="onClick"
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
      return this.item.customerFeedback;
    },
    color() {
      return this.feedback.note ? '#ff941b' : null;
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
