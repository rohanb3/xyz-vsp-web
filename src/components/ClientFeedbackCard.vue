<template>
  <table-full-height-balloon @close="close">
    <div class="client-feedback-card call-feedback-card">

      <div class="card-header">
        <h3>{{ $t('Client feedback') }}</h3>
        <v-icon
          class="close-icon"
          @click="close"
        >
          clear
        </v-icon>
      </div>

      <div class="labelled-description rate-and-experience">
        <div class="label">{{ $t('Rate and experience with operator') }}</div>
        <div class="description">{{ rate }}</div>
      </div>

      <div class="labelled-description call-quality">
        <div class="label">{{ $t('Quality of audio and video') }}</div>
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

      <div class="technical-details">

        <div class="technical-detail">
          <div class="detail-title">{{ $t('Retailer') }}</div>
          <div class="detail-value">{{ retailer }}</div>
        </div>

        <div class="technical-detail">
          <div class="detail-title">{{ $t('VSP ID') }}</div>
          <div class="detail-value">{{ vspId }}</div>
        </div>

        <div class="technical-detail">
          <div class="detail-title">{{ $t('Location') }}</div>
          <div class="detail-value">{{ location }}</div>
        </div>

      </div>

    </div>
  </table-full-height-balloon>
</template>

<script>
import TableFullHeightBalloon from '@/components/TableFullHeightBalloon.vue';

export default {
  name: 'ClientFeedbackCard',
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
      return this.call.clientFeedback;
    },
    rate() {
      return this.$t(this.feedback.rate);
    },
    quality() {
      return Number(this.feedback.quality);
    },
    message() {
      return this.feedback.message;
    },
    retailer() {
      return this.call.retailers;
    },
    location() {
      return this.call.location;
    },
    vspId() {
      return this.call.id;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
