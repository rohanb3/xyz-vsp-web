<template>
  <v-btn
    icon
    small
    class="feedback-button"
  >
    <v-icon :color="color || 'rgba(153, 153, 153, 0.3)'">message</v-icon>
    <div
      v-if="feedback && feedback.record"
      class="record-icon"
    >
      <div class="arrow-wrapper">
        <v-icon
          class="arrow-icon"
          color="#398ffb"
        >play_arrow</v-icon>
      </div>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: 'CallFeedbackIcon',
  props: {
    feedback: {
      type: Object,
    },
    color: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.feedback-button {
  position: relative;
}

.record-icon {
  position: absolute;
  width: 11px;
  height: 11px;
  bottom: 2px;
  right: 2px;
  box-shadow: 0 1px 2px 0 rgba(28, 83, 152, 0.53);
  background-color: #fafafa;
  border-radius: 50%;
}

.arrow-wrapper {
  position: relative;
  width: 11px;
  height: 11px;
}

.arrow-icon {
  position: absolute;
  color: #398ffb;
  transform: scale(0.45);
  top: -6px;
  right: -7px;
}
</style>
