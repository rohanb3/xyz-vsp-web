<template>
  <div class="widget-container">
    <div class="column">
      <span class="widget-title">{{$t('total.duration')}}</span>
      <span class="widget-value">{{formattedValue}}</span>
    </div>
  </div>
</template>

<script>
import { secondsToHoursMinutesSeconds } from '@/services/dateHelper';

export default {
  name: 'TotalDuration',
  props: ['value'],
  computed: {
    formattedValue() {
      return secondsToHoursMinutesSeconds(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.widget-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 9px;
  margin-right: 10px;
}
.widget-title {
  font-size: 12px;
  color: $base-grey;
  display: block;
}
.widget-value {
  font-size: 16px;
  font-weight: 500;
  color: $base-text-color;
}
</style>
