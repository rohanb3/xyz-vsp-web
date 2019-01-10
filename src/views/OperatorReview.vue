<template>
  <div class="block">
    <MultipleLinesChartHeader
      :rowChartData="rowChartData"
      @processedChartDataChanged="onProcessedChartDataChanged"
    ></MultipleLinesChartHeader>
    <MultipleLinesChart :chartData="processedChartData"/>
  </div>
</template>

<script>
import MultipleLinesChart from '@/components/charts/MultipleLinesChart';
import MultipleLinesChartHeader from '@/components/charts/MultipleLinesChartHeader';
// import { getOperatorReview } from '@/services/repository';

const rowChartData = require('../../functions/fake-be/fixtures/operatorReview.json');

export default {
  name: 'OperatorReview',
  components: { MultipleLinesChart, MultipleLinesChartHeader },
  mounted() {
    this.rowChartData = rowChartData.items;
    // getOperatorReview().then(data => {this.chartData = data.items});
  },
  data() {
    return {
      rowChartData: [],
      processedChartData: {},
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
.block {
  margin: 28px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 #b8b8b880;
  background-color: #ffffff;
}
</style>
