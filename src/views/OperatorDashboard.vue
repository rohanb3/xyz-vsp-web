<template>
  <div class="page-container">
    <Effort :title="$t('team.effort')" :value="teamEffortValue"/>
    <Divider/>
    <Effort :title="$t('personal.effort')" :value="personalEffortValue"/>
  </div>
</template>

<script>
import Effort from '@/components/dashboardWidgets/Effort';
import Divider from '@/components/common/Divider';

const dashboardData = require('../../functions/fake-be/fixtures/operatorDashboard.json');

export default {
  name: 'OperatorDashboard',
  components: { Effort, Divider },
  data() {
    return {
      teamEffortValue: null,
      personalEffortValue: null,
    };
  },
  mounted() {
    this.teamEffortValue = dashboardData.teamEffort.totalCalls;
    this.personalEffortValue = dashboardData.personalEffort.totalCalls;
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}
</style>
