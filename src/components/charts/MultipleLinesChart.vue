<template>
  <LineChart :chartData="filteredChartData" :options="options"></LineChart>
</template>

<script>
import LineChart from '@/components/charts/LineChart';

export default {
  name: 'MultipleLinesChart',
  components: { LineChart },
  props: ['chartData'],
  computed: {
    filteredChartData() {
      if (this.chartData.datasets) {
        return {
          ...this.chartData,
          datasets: this.chartData.datasets.filter(item => !item.disabled),
        };
      }
      return {};
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: this.getYAxes(),
        },
        legend: {
          display: false,
        },
      };
    },
  },
  methods: {
    getYAxes() {
      if (this.chartData.datasets) {
        return this.chartData.datasets.map((item, index) => ({
          id: index.toString(),
          display: false,
        }));
      }
      return [];
    },
  },
};
</script>
