<template>
  <div class="supervisor-dashboard-page">
    <semicircle-chart :datasets="datasets"/>
  </div>
</template>

<script>
import SemicircleChart from '@/components/charts/SemicircleChart/SemicircleChart';

export default {
  name: 'SupervisorDashboard',
  components: {
    SemicircleChart,
  },
  data() {
    return {
      // Now Payload with time
      datasets: [
        { color: '#7ed321', value: 150, title: 'result', type: 'time' },
        { color: '#d2d2d2', value: 400, title: 'max', type: 'time' },
      ],
      // Try Payload with integer data
      // datasets: [
      //   { color: 'red', value: 100, title: 'result' },
      //   { color: '#d2d2d2', value: 500, title: 'max' },
      // ],
    };
  },
};
</script>
