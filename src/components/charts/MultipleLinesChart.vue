<template>
  <LineChart :chartData="filteredChartData" :options="options"></LineChart>
</template>

<script>
import LineChart from '@/components/charts/LineChart';

const customTooltips = (tooltip, chartData) => {
  // Sample from https://github.com/chartjs/Chart.js/blob/master/samples/tooltips/custom-line.html
  const { dataPoints } = tooltip;
  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip');
  const chart = document.getElementById('line-chart');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<div class="tt-container"></div>';
    chart.parentNode.appendChild(tooltipEl);
  }
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }
  tooltipEl.style.opacity = 1;

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    let innerHtml = '';
    titleLines.forEach(title => {
      innerHtml += `<div class="tt-title">${title}</div>`;
    });

    const { index, datasetIndex } = dataPoints[0];
    chartData.datasets.forEach((datasetItem, i) => {
      const { borderColor, id } = datasetItem;
      const value = datasetItem.data[index];
      const isActive = datasetIndex === i ? 'active' : '';
      const lineBlock = `<div class="tt-line-container ${isActive}">
        <div class="tt-line-color" style="background-color: ${borderColor}"></div>
        <div class="tt-line-name">${id}</div>
        <div class="tt-line-value">${value}</div>
      </div>`;
      innerHtml += lineBlock;
    });

    const container = tooltipEl.querySelector('.tt-container');
    container.innerHTML = innerHtml;
  }
  // Display, position
  const positionY = chart.offsetTop;
  const positionX = chart.offsetLeft;
  tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
  tooltipEl.style.top = `${positionY + positionY * 0.1}px`;
};

export default {
  name: 'MultipleLinesChart',
  components: { LineChart },
  props: ['chartData'],
  computed: {
    filteredChartData() {
      if (this.chartData.datasets) {
        return {
          ...this.chartData,
          datasets: this.chartData.datasets.filter(item => !item.disabled),
        };
      }
      return {};
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: this.getYAxes(),
        },
        legend: {
          display: false,
        },
        tooltips: {
          custom: tooltip => customTooltips(tooltip, this.filteredChartData),
          enabled: false,
        },
      };
    },
  },
  methods: {
    getYAxes() {
      if (this.chartData.datasets) {
        return this.chartData.datasets.map((item, index) => ({
          id: index.toString(),
          display: false,
        }));
      }
      return [];
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
#chartjs-tooltip {
  opacity: 1;
  position: absolute;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 #00000038;
  transition: all 0.1s ease;
  transform: translate(-50%, 0);
  pointer-events: none;
}
.tt-title {
  font-size: 14px;
  color: $base-text-color;
  font-weight: bold;
  padding: 15px;
}
.tt-line-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 18px 6px 16px;
  &.active {
    background-color: rgba(57, 143, 251, 0.1);
  }
}
.tt-line-color {
  width: 20px;
  height: 2px;
}
.tt-line-name {
  font-size: 12px;
  color: #999;
  padding-left: 15px;
  padding-right: 18px;
}
.tt-line-value {
  font-size: 14px;
  color: $base-text-color;
  font-weight: bold;
  text-align: right;
  flex: 1;
}
</style>
