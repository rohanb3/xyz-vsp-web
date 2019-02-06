<template>
  <LineChart :chartData="processedChartData" :options="options"></LineChart>
</template>

<script>
import LineChart from '@/components/charts/LineChart';

const colors = [
  {
    borderColor: 'transparent',
    backgroundColor: 'rgba(57, 143, 251, 0.5)',
  },
  {
    borderColor: 'rgba(57, 143, 251, 0.5)',
    backgroundColor: 'transparent',
  },
];

export default {
  name: 'CallsChart',
  components: { LineChart },
  props: ['chartData'],
  computed: {
    processedChartData() {
      if (this.chartData.length) {
        return {
          labels: this.chartData.map(item => item.xAxeValue),
          datasets: this.prepareDatasets(this.chartData),
        };
      }
      return {};
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          position: 'bottom',
        },
      };
    },
  },
  methods: {
    prepareDatasets(data) {
      const keys = Object.keys(data[0].values);
      return keys.map((key, index) => ({
        label: key,
        borderColor: colors[index].borderColor,
        backgroundColor: colors[index].backgroundColor,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        data: data.map(item => item.values[key]),
      }));
    },
  },
};
</script>
