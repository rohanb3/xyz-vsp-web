<template>
    <div class="semicircle-chart">
      <chart class="semicircle-chart-wrapper" :chartData="chartData"/>
      <div class="semicircle-chart-data">
        <div class="data-title" :class="{giant: !options.showRatio}"><p class="bold">{{resultPersentageInteger}}</p>{{resultPersentageDecimal}} %</div>
        <div v-if="options.showRatio" class="ratio"><p class="result">{{result}} </p><p class="total">of {{total}}</p></div>
        </div>
    </div>
</template>

<script>
import { secondsToMinutesSeconds } from '@/services/dateHelper';
import Chart from './Chart';

export default {
  name: 'SemicircleChart',
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
        showRatio: true,
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
    chartData() {
      const convertedData = {
        backgroundColor: [],
        data: [],
      };

      this.datasets
        .concat()
        // eslint-disable-next-line no-unused-vars
        .sort((a, b) => (a.title === 'result' ? -1 : 1))
        .forEach(dataset => {
          convertedData.backgroundColor.push(dataset.color);
          convertedData.data.push(
            dataset.title === 'max' ? this.totalPersentage : this.resultPersentage
          );
        });

      return {
        datasets: [convertedData],
      };
    },
    result() {
      const result = this.datasets.find(dataset => dataset.title === 'result');

      return this.formatValue(result);
    },
    total() {
      const total = this.datasets.find(dataset => dataset.title === 'max');

      return this.formatValue(total);
    },
    resultPersentageInteger() {
      const decimal = this.resultPersentage % 1;

      return decimal > 0 ? `${Math.floor(this.resultPersentage)}.` : this.resultPersentage;
    },
    resultPersentageDecimal() {
      const decimal = this.resultPersentage % 1;

      return decimal > 0 ? `${decimal.toString().slice(2)}` : '';
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

.semicircle-chart {
  width: 220px;
  height: 114px;
  position: relative;

  .semicircle-chart-wrapper {
    width: 220px;
    height: 114px;
  }
  .semicircle-chart-data {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-direction: column;
    display: flex;
    top: 0;
    left: 0;

    .data-title {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      color: $semicircle-chart-data-title-color;
      margin-top: 30px;
      font-size: 24px;

      &.giant {
        margin-top: 55px;
        .bold {
          font-size: 42px;
        }
      }

      .bold {
        font-size: 32px;
        font-weight: bold;
      }
    }

    .ratio {
      display: flex;
      flex-direction: row;
      font-size: 14px;

      .result {
        font-weight: bold;
        color: $semicircle-chart-result-color;
        margin-right: 2px;
        &::before {
          content: '';
          width: 6px;
          height: 6px;
          display: inline-block;
          background-color: $semicircle-chart-result-dot-background-color;
          border-radius: 50%;
          margin-right: 4px;
        }
      }

      .total {
        color: $semicircle-chart-total-color;
      }
    }
  }
}
</style>
