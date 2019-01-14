<script>
import { Doughnut, mixins } from 'vue-chartjs';

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: Object,
    styles: Object,
    options: {
      type: Object,
      default: () => ({
        cutoutPercentage: 80,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        responsive: true,
        maintainAspectRatio: false,
      }),
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
