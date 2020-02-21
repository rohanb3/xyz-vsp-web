<template>
  <div class="dashboard container">
    <div class="dash-header">
      <h1 class="dash-title">{{ $t('live.dashboard') }}</h1>
      <span class="dash-tenant-filter">
        <realtime-dashboard-tenant-filter/>
      </span>
    </div>
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
import { getTenantList, getTenant } from '@/services/getRepository';
import RealtimeDashboardTenantFilter from '@/containers/RealtimeDashboardTenantFilter';
import WaitingCallsWidget from '@/containers/WaitingCallsWidgets';
import LiveCallsWidget from '@/containers/LiveCallsWidgets';
import OperatorsWidget from '@/containers/OperatorsWidgets';
import ResponseTimeWidget from '@/containers/ResponseTimeWidgets';
import CallStatisticsWidget from '@/containers/CallStatisticsWidgets';

export default {
  name: 'dashboard',
  components: {
    RealtimeDashboardTenantFilter,
    WaitingCallsWidget,
    LiveCallsWidget,
    OperatorsWidget,
    ResponseTimeWidget,
    CallStatisticsWidget,
  },
  mounted() {
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
  .dash-header {
    padding-left: 8px;
    h1 {
      font-size: large;
      font-weight: bold;
      padding-bottom: 2%;
    }
    .dash-title {
      display: inline-block;
    }
    .dash-tenant-filter {
      display: inline-block;
      padding-left: 50px;
    }
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
