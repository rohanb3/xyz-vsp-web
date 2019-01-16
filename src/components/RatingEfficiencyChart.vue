<template>
<div class="rating-efficiency-chart">
  <circle-chart :datasets="datasets" :options="options">
  <div slot="bottom-bar" class="bottom-bar">
    <v-icon
      class="calls-icon"
      color="#7ed321"
      size="16"
    >
      phone_callback
    </v-icon>
    {{result}}
  </div>
  </circle-chart>
</div>
</template>

<script>
import CircleChart from '@/components/charts/CircleChart/CircleChart';

export default {
  name: 'RatingEfficiencyChart',
  components: {
    CircleChart,
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
    result() {
      return this.datasets.find(dataset => dataset.role === 'result').value;
    },
  },
};
</script>


<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.rating-efficiency-chart {
  .bottom-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: $rating-efficiency-chart-bottom-bar-color;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
