<template>
    <div class="circle-chart" :style="{width: `${options.size}px`, height: `${options.size}px` }">
      <div class="circle-chart-wrapper">
      <chart class="chart" :chartData="chartData" :style="{width: `${options.size}px`, height: `${options.size}px` }"/>
      <div class="chart-data">
        <p class="title">{{dataTitle}}</p>
        <p class="value">{{resultPersentage}} %</p>
        </div>
        </div>
        <slot name="bottom-bar" class="bottom-bar"></slot>
    </div>
</template>

<script>
import { secondsToMinutesSeconds } from '@/services/dateHelper';
import Chart from './Chart';

export default {
  name: 'CircleChart',
  components: {
    Chart,
  },
  props: {
    datasets: {
      type: Array,
    },
    options: {
      type: Object,
      default: () => ({
        size: 76,
      }),
    },
  },
  computed: {
    resultPersentage() {
      const values = this.datasets.map(dataset => dataset.value);
      const total = Math.max(...values);
      const result = Math.min(...values);
      return (result * 100) / total;
    },
    totalPersentage() {
      return 100 - this.resultPersentage;
    },
    dataTitle() {
      return this.datasets.find(dataset => dataset.role === 'result').title;
    },
    chartData() {
      const convertedData = {
        backgroundColor: [],
        data: [],
      };
      this.datasets
        .concat()
        // eslint-disable-next-line no-unused-vars
        .sort((a, b) => (a.role === 'result' ? -1 : 1))
        .forEach(dataset => {
          convertedData.backgroundColor.push(dataset.color);
          convertedData.data.push(
            dataset.role === 'max' ? this.totalPersentage : this.resultPersentage
          );
        });

      return {
        datasets: [convertedData],
      };
    },
    result() {
      const result = this.datasets.find(dataset => dataset.role === 'result');

      return this.formatValue(result);
    },
    total() {
      const total = this.datasets.find(dataset => dataset.role === 'max');

      return this.formatValue(total);
    },
  },
  methods: {
    formatValue(data) {
      return data.type === 'time' ? secondsToMinutesSeconds(data.value) : data.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.circle-chart {
  width: 80px;
  height: 80px;
  position: relative;

  .chart {
    width: 80px;
    height: 80px;
  }
  .chart-data {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-direction: column;
    display: flex;
    top: 3px;
    left: 1px;

    .title {
      color: $circle-chart-data-title-color;
      font-size: 14px;
    }
    .value {
      color: $circle-chart-data-value-color;
      font-size: 16px;
    }
  }
}
</style>
