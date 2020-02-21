<template>
  <div class="dashboard container">
    <h1>{{ $t('live.dashboard') }}</h1>
    <div class="widgets-row">
      <div class="widgets-column">
        <waiting-calls-widget/>
        <live-calls-widget/>
      </div>
      <div class="widgets-column">
        <operators-widget/>
      </div>
      <div class="widgets-column">
        <response-time-widget/>
      </div>
      <div class="widgets-column">
        <call-statistics-widget/>
      </div>
    </div>
  </div>
</template>

<script>
import { unsubscribe, loadCallsData } from '@/services/realtimeDashboard';
import WaitingCallsWidget from '@/containers/WaitingCallsWidgets';
import LiveCallsWidget from '@/containers/LiveCallsWidgets';
import OperatorsWidget from '@/containers/OperatorsWidgets';
import ResponseTimeWidget from '@/containers/ResponseTimeWidgets';
import CallStatisticsWidget from '@/containers/CallStatisticsWidgets';

export default {
  name: 'dashboard',
  components: {
    WaitingCallsWidget,
    LiveCallsWidget,
    OperatorsWidget,
    ResponseTimeWidget,
    CallStatisticsWidget,
  },
  mounted() {
    // subscribe moved to beforeEnter handler in router configuration
    // subscribe();
    loadCallsData();
  },
  destroyed() {
    unsubscribe();
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.dashboard {
  padding: $devices-list-padding;
  overflow: auto;
  /*height: 100%;*/
  h1 {
    font-size: large;
    font-weight: bold;
    padding-bottom: 2%;
  }
  .widgets-row {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
  }
  .widgets-column {
    display: inline-block;
    flex-grow: 1;
    padding: 10px;
  }
}
</style>
