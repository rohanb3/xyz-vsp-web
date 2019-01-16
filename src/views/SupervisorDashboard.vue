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

export default {
  name: 'SupervisorDashboard',
  components: {
    RatingEfficiencyChart,
    SemicircleChart,
    RatingChart,
  },
  data() {
    return {
      datasetsForRatingChart: [
        { title: 5, value: 2303 },
        { title: 4, value: 700 },
        { title: 3, value: 138 },
        { title: 2, value: 38 },
        { title: 1, value: 35 },
      ],
      // Now Payload with time
      datasetsForCircleChart: [
        { color: '#7ed321', value: 150, role: 'result', type: 'time', title: 'Info' },
        { color: '#d2d2d2', value: 400, role: 'max', type: 'time', title: 'Info' },
      ],
      // Try Payload with integer data
      // datasetsForCircleChart: [
      //   { color: '#7ed321', value: 100, role: 'result', title: 'Info' },
      //   { color: '#d2d2d2', value: 500, role: 'max', title: 'Info' },
      // ],

      datasetsForSemicircleChart: [
        { color: 'red', value: 150, title: 'result', type: 'time' },
        { color: '#d2d2d2', value: 400, title: 'max', type: 'time' },
      ],
      // Try Payload with integer data
      // datasetsForSemicircleChart: [
      //   { color: 'red', value: 100, title: 'result' },
      //   { color: '#d2d2d2', value: 500, title: 'max' },
      // ],
    };
  },
};
</script>
