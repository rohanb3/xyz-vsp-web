<template>
      <div class="supervisor-widgets">
        <average-waiting-time :data="datasets.waitingTime"/>
        <call-on-hold :calls="datasets.callsOnHold" :operators="datasets.availableOperators"/>
        <over-threshold :operators="datasets.overThresholdOperators"/>
        <missed-for-last-hours :percentage="datasets.missedCallsPersentage"/>
      </div>
</template>

<script>
import AverageWaitingTime from '@/components/supervisorWidgets/AverageWaitingTime';
import CallOnHold from '@/components/supervisorWidgets/CallOnHold';
import OverThreshold from '@/components/supervisorWidgets/OverThreshold';
import MissedForLastHours from '@/components/supervisorWidgets/MissedForLastHours';

const datasets = require('../../functions/fake-be/fixtures/supervisorDashboardWidgetsData.json');

export default {
  name: 'AppHeader',
  components: {
    AverageWaitingTime,
    CallOnHold,
    OverThreshold,
    MissedForLastHours,
  },
  data() {
    return {
      datasets: datasets.items,
    };
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.supervisor-widgets {
  padding: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px;
    flex-shrink: 0;
  }
}
</style>
