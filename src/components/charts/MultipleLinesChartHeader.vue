<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in processedChartData.datasets" :key="item.id">
      <span class="item-title">{{item.id}}</span>
      <div class="item-subcontainer">
        <input type="checkbox" @click="() => onItemClick(index)" checked>
        <div class="line" :style="{backgroundColor: item.borderColor}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getRandomColor } from '@/services/stylesHelper';

export default {
  name: 'MultipleLinesChartHeader',
  props: ['rowChartData'],
  data() {
    return {
      processedChartData: {},
    };
  },
  watch: {
    rowChartData(data) {
      this.processChartData(data);
    },
  },
  methods: {
    processChartData(data) {
      this.processedChartData = {
        labels: data.map(item => moment(item.date).format('D MMM')),
        datasets: this.prepareDatasets(data),
      };
      this.$emit('processedChartDataChanged', this.processedChartData);
    },
    prepareDatasets(data) {
      const keys = Object.keys(data[0].values);
      return keys.map((key, index) => ({
        id: key,
        borderColor: getRandomColor(),
        backgroundColor: 'transparent',
        lineTension: 0,
        yAxisID: index.toString(),
        data: data.map(item => item.values[key]),
        disabled: false,
      }));
    },
    onItemClick(index) {
      const currentDataset = this.processedChartData.datasets[index];
      currentDataset.disabled = !currentDataset.disabled;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.wrapper {
  display: flex;
}

.item {
  padding: 5px 20px 30px;
}

.line {
  width: 40px;
  height: 2px;
  margin: 7px;
}

.item-title {
  display: flex;
  font-size: 18px;
  color: $base-text-color;
  text-transform: capitalize;
}

.item-subcontainer {
  display: flex;
  flex-direction: row;
}
</style>
