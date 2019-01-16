<template>
  <div class="bar-chart">
    <bar-chart-item
      v-for="item in datasets"
      :key="item.title"
      :item="item"
    />
  </div>
</template>

<script>
import BarChartItem from './BarChartItem';

export default {
  name: 'BarChart',
  components: {
    BarChartItem,
  },
  props: {
    datasets: Array,
  },
};
</script>

<style lang="scss" scoped>
.bar-chart {
  padding: 0 0 0 2px;
  display: flex;
  flex-direction: column;
  align-content: space-between;

  .bar-chart-item:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>
