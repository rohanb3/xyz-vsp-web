<template>
  <div class="wrapper">
    <div class="items-container">
      <div v-for="(item, index) in processedChartData.datasets" :key="item.id">
        <div class="item" v-if="!item.disabled">
          <span class="item-title">{{item.id}}</span>
          <div class="item-subcontainer">
            <input type="checkbox" @click="() => onItemClick(index)" checked>
            <div class="line" :style="{backgroundColor: item.borderColor}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-editor-wrap">
      <MultipleLinesChartValuesEditor
        :values="valuesVisibilityData"
        :boundariesSelector="'.app-content'"
        @visibilityChanged="onValuesVisibilityChanged"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getRandomColor } from '@/services/stylesHelper';
import MultipleLinesChartValuesEditor from '@/components/charts/MultipleLinesChartValuesEditor';

export default {
  name: 'MultipleLinesChartHeader',
  props: ['rawChartData'],
  components: { MultipleLinesChartValuesEditor },
  data() {
    return {
      processedChartData: {},
    };
  },
  watch: {
    rawChartData(data) {
      this.processChartData(data);
    },
  },
  computed: {
    valuesVisibilityData() {
      if (this.processedChartData.datasets) {
        return this.processedChartData.datasets.map(item => ({
          name: item.id,
          title: item.id,
          visible: !item.disabled,
        }));
      }
      return [];
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
      return keys.map((key, index) => {
        const color = getRandomColor();
        return {
          id: key,
          borderColor: color,
          backgroundColor: 'transparent',
          lineTension: 0,
          yAxisID: index.toString(),
          data: data.map(item => item.values[key]),
          disabled: false,
        };
      });
    },
    onItemClick(index) {
      const currentDataset = this.processedChartData.datasets[index];
      currentDataset.disabled = !currentDataset.disabled;
    },
    onValuesVisibilityChanged(data) {
      const valueIndex = this.processedChartData.datasets.findIndex(
        item => data.name === item.id
      );
      this.processedChartData.datasets[valueIndex].disabled = !data.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.wrapper {
  display: flex;
  position: relative;
  padding: 0px 17px 10px;
  margin-bottom: 17px;
  border-bottom: 1px solid $chart-axis-color;
}
.item {
  padding: 5px 35px 20px 0px;
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
.chart-editor-wrap {
  position: absolute;
  right: 15px;
  top: 5px;
}
.items-container {
  display: flex;
  margin-right: 50px;
  overflow: auto;
}
</style>
