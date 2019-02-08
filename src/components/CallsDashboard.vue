<template>
  <div style="display: flex">
    <TotalCalls :value="totalCalls"/>
    <FailSuccessRate :values="failSuccessRate" :total="totalCalls"/>
    <TypesRate :values="typesRate" :total="totalCalls"/>
    <AveragePickup :value="averagePickup"/>
    <TotalDuration :value="totalDuration"/>
    <AverageRating :value="averageRating"/>
  </div>
</template>

<script>
import TotalCalls from '@/components/callsDashboardWidgets/TotalCalls';
import FailSuccessRate from '@/components/callsDashboardWidgets/FailSuccessRate';
import TypesRate from '@/components/callsDashboardWidgets/TypesRate';
import AveragePickup from '@/components/callsDashboardWidgets/AveragePickup';
import TotalDuration from '@/components/callsDashboardWidgets/TotalDuration';
import AverageRating from '@/components/callsDashboardWidgets/AverageRating';

const callsDashboardData = require('../../functions/fake-be/fixtures/callsDashboardData.json');

export default {
  name: 'CallsDashboard',
  components: {
    TotalCalls,
    FailSuccessRate,
    TypesRate,
    AveragePickup,
    TotalDuration,
    AverageRating,
  },
  data() {
    return {
      ...callsDashboardData,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>