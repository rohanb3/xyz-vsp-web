<template>
  <div class="dashboard container">
    <div class="realtime-dashboard-page">
      <div class="dash-header">
        <h1 class="dash-title">{{ $t('live.dashboard') }}</h1>
        <span class="dash-tenant-filter" v-if="isTenantFilterAllowed">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { unsubscribe, loadCallsData } from '@/services/realtimeDashboard';
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
  computed: {
    ...mapGetters(['isTenantFilterAllowed']),
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
  margin: 0px;
  max-width: 100%;

  .realtime-dashboard-page {
    width: 100%;
    border-radius: 8px;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.22);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.22);
    background-color: #fff;
    padding: 10px !important;
  }

  .dash-header {
    padding-left: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
    h1 {
      font-size: large;
      font-weight: bold;
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
