<template>
  <div class="widget-container">
    <div class="value-cell">
      <span class="value-text">{{formattedValue.average}}</span>
      <span class="calls-text">{{$t('average.call')}}</span>
    </div>
    <div class="value-cell">
      <span class="value-text">{{formattedValue.longest}}</span>
      <span class="calls-text">{{$t('longest.call')}}</span>
    </div>
  </div>
</template>

<script>
import { secondsToMinutesSeconds } from '@/services/dateHelper';

export default {
  name: 'AverageLongestCall',
  props: ['data'],
  computed: {
    formattedValue() {
      return {
        average: secondsToMinutesSeconds(this.data.averageCall),
        longest: secondsToMinutesSeconds(this.data.longestCall),
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
  width: 207px;
  height: 54px;
  display: flex;
}
.value-cell {
  display: flex;
  align-items: flex-start;
  flex: 1;
  flex-direction: column;
  padding-left: 17px;
  &:first-child {
    border-right: 1px solid rgba(151, 151, 151, 0.4);
  }
}
.value-text {
  font-size: 16px;
  color: $base-text-color;
  padding-top: 7px;
}
.calls-text {
  font-size: 12px;
  color: rgba(74, 74, 74, 0.6);
  padding-bottom: 3px;
}
</style>
