<template>
  <div class="charts-container">
    <div class="block">
      <MultipleLinesChartHeader
        :rawChartData="rawChartData"
        @processedChartDataChanged="onProcessedChartDataChanged"
      ></MultipleLinesChartHeader>
      <MultipleLinesChart :chartData="processedChartData"/>
    </div>
    <div class="block">
      <div class="calls-chart-title">Calls</div>
      <CallsChart :chartData="callsChartData"/>
    </div>
  </div>
</template>

<script>
import MultipleLinesChart from '@/components/charts/MultipleLinesChart';
import MultipleLinesChartHeader from '@/components/charts/MultipleLinesChartHeader';
import CallsChart from '@/components/charts/CallsChart';
import { getOperatorReview } from '@/services/repository';

const callsChartData = require('../../functions/fake-be/fixtures/callsChart.json');

export default {
  name: 'OperatorReview',
  components: { MultipleLinesChart, MultipleLinesChartHeader, CallsChart },
  mounted() {
    getOperatorReview().then(data => {
      this.rawChartData = data;
    });

    this.callsChartData = callsChartData.items;
  },
  data() {
    return {
      rawChartData: [],
      processedChartData: {},
      callsChartData: [],
    };
  },
  methods: {
    onProcessedChartDataChanged(data) {
      this.processedChartData = data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.block {
  margin: 28px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 #b8b8b880;
  background-color: #ffffff;
}
.charts-container {
  overflow-y: auto;
  height: 100%;
}
.calls-chart-title {
  font-size: 20px;
  font-weight: bold;
  color: $base-text-color;
  margin-left: 5px;
  margin-bottom: 25px;
}
</style>
