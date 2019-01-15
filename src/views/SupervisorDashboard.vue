<template>
  <div class="supervisor-dashboard-page">
    <semicircle-chart :datasets="datasets"/>
    <rating-chart :datasets="datasetsForRatingChart" title="Team Client Rating" route="/"/>
  </div>
</template>

<script>
import SemicircleChart from '@/components/charts/SemicircleChart/SemicircleChart';
import RatingChart from '@/components/RatingChart';

export default {
  name: 'SupervisorDashboard',
  components: {
    SemicircleChart,
    RatingChart,
  },
  data() {
    return {
      datasetsForRatingChart: [{title: 5, value: 2303},
        {title: 4, value: 700},
        {title: 3, value: 138},
        {title: 2, value: 38},
        {title: 1, value: 35}],
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
