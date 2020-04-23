<template>
      <div class="call-statistics-widgets">
        <realtime-dashboard-complex-widget
          :title="$t('call.statistics')"
          :headerSubTitle="$t('total')"
          :headerData="total"
          :leftSubTitle="$t('answered')"
          :leftData="answeredTotal"
          :rightSubTitle="$t('abandoned')"
          :rightData="abandonedTotal"
          :leftAdditionalSubDataList="leftAdditionalSubDataList"
          :rightAdditionalSubDataList="rightAdditionalSubDataList"
          :icon="icon"/>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/assets/icons/realtime-dashboard/call-statistics-icon.svg';
import RealtimeDashboardComplexWidget from '@/components/RealtimeDashboardComplexWidget';

export default {
  name: 'CallStatisticsWidget',
  components: {
    RealtimeDashboardComplexWidget,
  },
  computed: {
    ...mapGetters([
      'callStatisticsAnswered',
      'callStatisticsAbandoned',
      'callStatisticsCallbacksMissed',
      'callStatisticsCallbacksAnswered',
    ]),
    icon() {
      return icon;
    },
    answeredTotal() {
      return this.answered + this.answeredCallbacks;
    },
    abandonedTotal() {
      return this.abandoned + this.abandonedCallbacks;
    },
    answered() {
      return (this.callStatisticsAnswered && this.callStatisticsAnswered.total) || 0;
    },
    abandoned() {
      return (this.callStatisticsAbandoned && this.callStatisticsAbandoned.total) || 0;
    },
    answeredCallbacks() {
      return this.callStatisticsCallbacksAnswered || 0;
    },
    abandonedCallbacks() {
      return this.callStatisticsCallbacksMissed || 0;
    },
    total() {
      return this.answeredTotal + this.abandonedTotal;
    },
    leftAdditionalSubDataList() {
      return [
        { data: this.answered, title: this.$t('operator.calls') },
        { data: this.answeredCallbacks, title: this.$t('callbacks') },
      ];
    },
    rightAdditionalSubDataList() {
      return [
        { data: this.abandoned, title: this.$t('operator.calls') },
        { data: this.abandonedCallbacks, title: this.$t('callbacks') },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.call-statistics-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>

<style>
.call-statistics-widgets .realtime-dashboard-complex-widget .right-data-details .right-data-font {
  color: #e02020 !important;
}
</style>
