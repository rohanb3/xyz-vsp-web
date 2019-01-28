<template>
  <div class="widget-container" :style="{ width: `${width}px` }">
    <div class="row">
      <span class="widget-title" :style="{ color: colors.titleColor }">{{title}}</span>
      <span class="percent" :style="{ color: colors.percentColor }">{{percent}}%</span>
    </div>
    <div class="row">
      <span class="real-time">{{realTimeFormatted}}</span>
      <span class="total-time">{{$t('of')}} {{totalTimeFormatted}}</span>
    </div>
    <div class="row">
      <v-progress-linear
        class="progress"
        height="5"
        background-color="#f5f6fa"
        :color="colors.progressBarColor"
        :value="percent"
      ></v-progress-linear>
    </div>
  </div>
</template>

<script>
import { getPercentage } from '@/services/commonHelper';

export default {
  name: 'TotalTimeWithProgressBar',
  props: {
    realTime: {
      type: Number,
      default: 0,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
    width: {
      type: [Number, String],
      default: '286',
    },
    title: {
      type: String,
      default: '',
    },
    highlightStatus: {
      type: Boolean,
      default: false,
    },
    dateFormatterFunc: {
      type: Function,
      required: true,
    },
  },
  computed: {
    percent() {
      return getPercentage(this.realTime, this.totalTime);
    },
    realTimeFormatted() {
      return this.dateFormatterFunc(this.realTime);
    },
    totalTimeFormatted() {
      return this.dateFormatterFunc(this.totalTime);
    },
    colors() {
      const colorStatus = this.highlightStatus ? (this.percent > 100 ? 'red' : 'green') : 'default';
      const isRed = colorStatus === 'red';
      const isGreen = colorStatus === 'green';
      return {
        titleColor: isRed ? '#d0021b' : isGreen ? '#62a816' : '#4a4a4a',
        percentColor: isRed ? '#d0021b' : 'rgba(74, 74, 74, 0.5)',
        progressBarColor: isRed ? '#d0021b' : isGreen ? '#7ed321' : '#398ffb',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.widget-container {
  @include base-shadow-container;
  height: 86px;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 9px 0px;
}
.row {
  justify-content: space-between;
  display: flex;
  padding: 0 12px 0 13px;
  flex: 1;
  &:first-child {
    margin-bottom: 5px;
  }
}
.widget-title {
  font-size: 16px;
  font-weight: 500;
}
.percent {
  font-size: 14px;
}
.real-time {
  font-size: 24px;
  color: $base-text-color;
}
.total-time {
  font-size: 14px;
  color: rgba(74, 74, 74, 0.5);
  line-height: 43px;
}
.progress {
  border-radius: 5px;
}
</style>
