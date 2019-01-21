<template>
<div class="bar-chart-item">
  <p class="title">{{item.title}}</p>
  <v-icon
    color="rgba(153, 153, 153, 0.6)"
    size="11"
    class="icon"
  >
    start
  </v-icon>
  <div class="progress-bar" :style="{width: progressBarWidth}"/>
  <p class="value">{{item.value}} %</p>
</div>
</template>

<script>
const PROGRESS_BAR_MAX_WIDTH = 186.4;

export default {
  name: 'BarChartItem',
  props: {
    item: Object,
  },
  computed: {
    progressBarWidth() {
      return `${(PROGRESS_BAR_MAX_WIDTH * this.item.value) / 100}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.bar-chart-item {
  height: 14px;
  display: flex;
  align-items: center;

  .title {
    margin-right: 6px;
    font-size: 14px;
    font-weight: 500;
    color: $bar-chart-item-title-color;
  }
  .icon {
    margin-right: 6px;
  }

  .progress-bar {
    width: 0px;
    margin-right: 5px;
    height: 100%;
    background-color: $bar-chart-item-progress-bar-background-color;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    transition: width 2s;
  }

  .value {
    font-size: 12px;
    font-weight: 500;
    color: $bar-chart-item-value-color;
  }
}
</style>
