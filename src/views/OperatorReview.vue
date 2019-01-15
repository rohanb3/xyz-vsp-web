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
import { getOperatorReview } from '@/services/repository';

export default {
  name: 'OperatorReview',
  components: { MultipleLinesChart, MultipleLinesChartHeader },
  mounted() {
    getOperatorReview().then(data => {
      this.rowChartData = data;
    });
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
