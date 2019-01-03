<template>
  <div class="block">
    <OperatorReviewChart :chartData="chartData"/>
  </div>
</template>

<script>
import OperatorReviewChart from '@/components/OperatorReviewChart';
import moment from 'moment';
import { getOperatorReview } from '@/services/repository';

export default {
  name: 'OperatorReview',
  components: { OperatorReviewChart },
  mounted() {
    getOperatorReview().then(this.prepareChartData);
  },
  data() {
    return {
      chartData: {},
    };
  },
  methods: {
    prepareChartData(data) {
      this.chartData = {
        labels: data.map(item => moment(item.date).format('D MMM')),
        datasets: [
          {
            label: 'Efficiency',
            borderColor: '#398ffb',
            backgroundColor: 'transparent',
            lineTension: 0,
            data: data.map(item => item.efficiency),
          },
          {
            label: 'Duration',
            borderColor: '#b0b0b0',
            backgroundColor: 'transparent',
            lineTension: 0,
            data: data.map(item => item.duration),
          },
          {
            label: 'Bonus',
            borderColor: '#7ed321',
            backgroundColor: 'transparent',
            lineTension: 0,
            data: data.map(item => item.bonus),
          },
        ],
      };
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
