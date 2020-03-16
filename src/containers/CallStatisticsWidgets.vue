<template>
      <div class="call-statistics-widgets">
        <realtime-dashboard-complex-widget
          :title="$t('call.statistics')"
          :headerSubTitle="$t('total')"
          :headerData="total"
          :leftSubTitle="$t('answered')"
          :leftData="answered"
          :rightSubTitle="$t('abandoned')"
          :rightData="abandoned"
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
    ...mapGetters(['callStatisticsAnswered', 'callStatisticsAbandoned']),
    icon() {
      return icon;
    },
    answered() {
      return (this.callStatisticsAnswered && this.callStatisticsAnswered.total) || 0;
    },
    abandoned() {
      return (this.callStatisticsAbandoned && this.callStatisticsAbandoned.total) || 0;
    },
    total() {
      return this.answered + this.abandoned;
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
