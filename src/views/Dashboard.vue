<template>
  <div class="dashboard container">
    <div class="realtime-dashboard-page">
      <div class="dashboard-header">
        <h1 class="dash-title">{{ $t('live.dashboard') }}</h1>

        <span class="dash-tenant-filter" v-if="isTenantFilterAllowed">
          <realtime-dashboard-tenant-filter/>
        </span>
      </div>
      <div class="widgets-row">
        <div class="widgets-column">
          <waiting-calls-widget class="widget-item" />
          <live-calls-widget class="widget-item" />
        </div>
        <div class="widgets-column">
          <operators-widget class="widget-item" />
        </div>
        <div class="widgets-column">
          <response-time-widget class="widget-item" />
        </div>
        <div class="widgets-column">
          <call-statistics-widget class="widget-item" />
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
  min-width: 1200px;

  .realtime-dashboard-page {
    width: 100%;
    border-radius: 8px;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
  }

  .dashboard-header {
    padding: 0 20px;
    height: 60px;
    line-height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;

    h1 {
      font-size: 20px;
      font-weight: bold;
      color: #4a4a4a;
    }
    .dash-title {
      display: inline-block;
    }
    .dash-tenant-filter {
      display: inline-block;
      padding-left: 33px;
    }
  }
  .widgets-row {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    padding: 0 10px 10px 10px;
  }
  .widgets-column {
    display: inline-block;
    flex-grow: 1;
    padding: 10px;
    max-width: 25%;
  }
  .widget-item {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  }
}
</style>
