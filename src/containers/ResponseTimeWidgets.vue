<template>
      <div class="response-time-widgets">
        <realtime-dashboard-complex-widget
          :title="$t('response.time')"
          :leftSubTitle="$t('average')"
          :leftData="average"
          :rightSubTitle="$t('longest')"
          :rightData="longest"
          :icon="icon"/>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { secondsToMinutesAndSeconds } from '@/services/dateHelper';
import icon from '@/assets/icons/realtime-dashboard/response-time-icon.svg';
import RealtimeDashboardComplexWidget from '@/components/RealtimeDashboardComplexWidget';

export default {
  name: 'ResponseTimeWidget',
  components: {
    RealtimeDashboardComplexWidget,
  },
  computed: {
    ...mapGetters(['callStatisticsAnswered']),
    icon() {
      return icon;
    },
    average() {
      const aver =
        (this.callStatisticsAnswered &&
          Math.round(this.callStatisticsAnswered.averageWaitingDuration)) ||
        0;
      return secondsToMinutesAndSeconds(aver);
    },
    longest() {
      const secs =
        (this.callStatisticsAnswered && this.callStatisticsAnswered.maxWaitingDuration) || 0;
      return secondsToMinutesAndSeconds(secs);
    },
  },
};
</script>

<style scoped lang="scss">
.response-time-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
