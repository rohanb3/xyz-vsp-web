<template>
  <table-full-height-balloon @close="close">
    <div class="operator-feedback-card call-feedback-card">

      <div class="card-header">
        <h3>{{ $t('operator.feedback') }}</h3>
        <v-icon
          class="close-icon"
          @click="close"
        >
          clear
        </v-icon>
      </div>

      <div class="labelled-description call-type">
        <div class="label">{{ $t('type.of.call') }}</div>
        <div class="description">{{ type }}</div>
      </div>

      <div
        v-if="disposition"
        class="labelled-description disposition"
      >
        <div class="label">{{ $t('disposition') }}</div>
        <div class="description">{{ disposition }}</div>
      </div>

      <div class="labelled-description system-quality">
        <div class="label">{{ $t('system.quality.rating') }}</div>
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

    </div>
  </table-full-height-balloon>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';

export default {
  name: 'OperatorFeedbackCard',
  components: {
    VuePerfectScrollbar,
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
      return this.call.operatorFeedback || {};
    },
    disposition() {
      return this.call.disposition;
    },
    message() {
      return this.feedback.note;
    },
    quality() {
      return Number(this.feedback.quality);
    },
    type() {
      return this.feedback.callType ? this.$t(this.feedback.callType) : '';
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
