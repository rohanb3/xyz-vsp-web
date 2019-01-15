<template>
  <div class="supervisor-dashboard-page">
    <rating-efficiency-chart :datasets="datasetsForCircleChart"/>
    <semicircle-chart :datasets="datasetsForSemicircleChart"/>
  </div>
</template>

<script>
import RatingEfficiencyChart from '@/components/RatingEfficiencyChart';
import SemicircleChart from '@/components/charts/SemicircleChart/SemicircleChart';

export default {
  name: 'SupervisorDashboard',
  components: {
    RatingEfficiencyChart,
    SemicircleChart,
  },
  data() {
    return {
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
