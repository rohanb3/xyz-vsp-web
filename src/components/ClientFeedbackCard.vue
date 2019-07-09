<template>
  <table-full-height-balloon @close="close">
    <div class="client-feedback-card call-feedback-card">

      <div class="card-header">
        <h3>{{ $t('client.feedback') }}</h3>
        <v-icon
          class="close-icon"
          @click="close"
        >
          clear
        </v-icon>
      </div>

      <div class="labelled-description rate-and-experience">
        <div class="label">{{ $t('rate.and.experience.with.operator') }}</div>
        <div class="description">{{ rate || '-' }}</div>
      </div>

      <div class="labelled-description call-quality">
        <div class="label">{{ $t('quality.of.audio.and.video') }}</div>
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
        <div class="label">{{ $t('note') }}</div>
        <vue-perfect-scrollbar>
          <div class="description">{{ message }}</div>
        </vue-perfect-scrollbar>
      </div>

      <div class="technical-details">

        <div v-if="isSuperAdmin" class="technical-detail">
          <div class="detail-title">{{ $t('retailer') }}</div>
          <div class="detail-value">{{ retailer }}</div>
        </div>

        <!-- <div class="technical-detail">
          <div class="detail-title">{{ $t('vsp.id') }}</div>
          <div class="detail-value">{{ vspId }}</div>
        </div>

        <div class="technical-detail">
          <div class="detail-title">{{ $t('location') }}</div>
          <div class="detail-value">{{ location }}</div>
        </div> -->

      </div>

    </div>
  </table-full-height-balloon>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';

export default {
  name: 'ClientFeedbackCard',
  components: {
    VuePerfectScrollbar,
    TableFullHeightBalloon,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    feedback() {
      return this.call.customerFeedback || {};
    },
    rate() {
      return this.$t(this.feedback.experienceRate);
    },
    quality() {
      return Number(this.feedback.quality);
    },
    message() {
      return this.feedback.note;
    },
    retailer() {
      return this.call.company;
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

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.labelled-description.note {
  .ps-container {
    max-height: calc(100vh - #{$header-height} - 250px);
  }

  .description {
    padding-right: 5px;
  }
}
</style>
