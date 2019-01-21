<template>
  <div class="page-container">
    <div class="widget-row">
      <div class="widget-item">
        <Effort :title="$t('team.effort')" :value="teamData.totalCalls"/>
      </div>
      <div class="widget-item">
        <AnsweredMissedCallsProgressBar :data="teamData"/>
      </div>
      <div class="widget-item">
        <CallEfficiency :value="teamData.callEfficiency"/>
      </div>
    </div>
    <Divider/>
    <Effort :title="$t('personal.effort')" :value="personalData.totalCalls"/>
  </div>
</template>

<script>
import Effort from '@/components/dashboardWidgets/Effort';
import AnsweredMissedCallsProgressBar from '@/components/dashboardWidgets/AnsweredMissedCallsProgressBar';
import CallEfficiency from '@/components/dashboardWidgets/CallEfficiency';
import Divider from '@/components/common/Divider';

const dashboardData = require('../../functions/fake-be/fixtures/operatorDashboard.json');

export default {
  name: 'OperatorDashboard',
  components: {
    Effort,
    Divider,
    AnsweredMissedCallsProgressBar,
    CallEfficiency,
  },
  data() {
    return {
      teamData: {},
      personalData: {},
    };
  },
  mounted() {
    this.teamData = dashboardData.teamEffort;
    this.personalData = dashboardData.personalEffort;
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}
.widget-row {
  display: flex;
  flex-direction: row;
}
.widget-item {
  margin-right: 11px;
}
</style>
