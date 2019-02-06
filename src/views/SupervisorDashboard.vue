<template>
  <div class="supervisor-dashboard-page">
    <rating-chart :datasets="datasetsForRatingChart" title="Team Client Rating" route="/"/>
    <rating-efficiency-chart :datasets="datasetsForCircleChart"/>
    <semicircle-chart :datasets="datasetsForSemicircleChart"/>
  </div>
</template>

<script>
import RatingEfficiencyChart from '@/components/RatingEfficiencyChart';
import SemicircleChart from '@/components/charts/SemicircleChart/SemicircleChart';
import RatingChart from '@/components/RatingChart';

const datasetsForRatingChart = require('../../functions/fake-be/fixtures/ratingChartData.json');
const datasetsForCircleChart = require('../../functions/fake-be/fixtures/circleChartData.json');
const datasetsForSemicircleChart = require('../../functions/fake-be/fixtures/semicircleChartData.json');

export default {
  name: 'SupervisorDashboard',
  components: {
    RatingEfficiencyChart,
    SemicircleChart,
    RatingChart,
  },
  data() {
    return {
      datasetsForRatingChart: datasetsForRatingChart.items,
      datasetsForCircleChart: datasetsForCircleChart.items,
      datasetsForSemicircleChart: datasetsForSemicircleChart.items,
    };
  },
};
</script>
