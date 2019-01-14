<template>
  <div class="supervisor-dashboard-page">
    <circle-chart :datasets="datasets"/>
    <RatingEfficiencyChart :datasets="datasets"/>
  </div>
</template>

<script>
import CircleChart from '@/components/charts/CircleChart/CircleChart';
import RatingEfficiencyChart from '@/components/RatingEfficiencyChart';

export default {
  name: 'SupervisorDashboard',
  components: {
    CircleChart,
    RatingEfficiencyChart,
  },
  data() {
    return {
      // Now Payload with time
      datasets: [
        { color: '#7ed321', value: 150, role: 'result', type: 'time', title: 'Info' },
        { color: '#d2d2d2', value: 400, role: 'max', type: 'time', title: 'Info' },
      ],
      // Try Payload with integer data
      // datasets: [
      //   { color: '#7ed321', value: 100, role: 'result', title: 'Info' },
      //   { color: '#d2d2d2', value: 500, role: 'max', title: 'Info' },
      // ],
    };
  },
};
</script>
