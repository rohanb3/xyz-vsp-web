<template>
  <table-full-height-balloon @close="close">
    <div class="operator-feedback-card call-feedback-card">

      <div class="card-header">
        <h3>{{ $t('Operator feedback') }}</h3>
        <v-icon
          class="close-icon"
          @click="close"
        >
          clear
        </v-icon>
      </div>

      <div class="labelled-description call-type">
        <div class="label">{{ $t('Type of call') }}</div>
        <div class="description">{{ type }}</div>
      </div>

      <div
        v-if="disposition"
        class="labelled-description disposition"
      >
        <div class="label">{{ $t('Disposition') }}</div>
        <div class="description">{{ disposition }}</div>
      </div>

      <div class="labelled-description system-quality">
        <div class="label">{{ $t('System quality rating') }}</div>
        <div class="description">
          <v-rating
            color="#ff941b"
            background-color="grey lighten-1"
            readonly
            :value="quality"/>
        </div>
      </div>

      <div
        v-if="message"
        class="labelled-description note"
      >
        <div class="label">{{ $t('Note') }}</div>
        <div class="description">{{ message }}</div>
      </div>

    </div>
  </table-full-height-balloon>
</template>

<script>
import TableFullHeightBalloon from '@/components/TableFullHeightBalloon.vue';

export default {
  name: 'OperatorFeedbackCard',
  components: {
    TableFullHeightBalloon,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
  },
  computed: {
    feedback() {
      return this.call.operatorFeedback;
    },
    disposition() {
      return this.call.disposition;
    },
    message() {
      return this.feedback.message;
    },
    quality() {
      return Number(this.feedback.quality);
    },
    type() {
      return this.$t(this.call.type);
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
