<script>
import { Doughnut, mixins } from 'vue-chartjs';

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: Object,
    options: {
      type: Object,
      default: () => ({
        cutoutPercentage: 80,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      }),
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
