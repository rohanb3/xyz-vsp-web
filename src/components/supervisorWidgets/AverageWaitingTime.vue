<template>
  <div class="average-waiting-time-widget">
    <supervisor-header-widget :name="$t('average.waiting.time')">
      <span slot="value" class="value">{{longest}}</span>
        <span slot="additional" class="additional">of {{average}}</span>
    </supervisor-header-widget>
  </div>
</template>

<script>
import { secondsToMinutesSeconds } from '@/services/dateHelper';

import SupervisorHeaderWidget from '@/components/supervisorWidgets/SupervisorHeaderWidget';

export default {
  name: 'AverageWaitingTime',
  components: {
    SupervisorHeaderWidget,
  },
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    longest() {
      return secondsToMinutesSeconds(this.data.longest);
    },
    average() {
      return secondsToMinutesSeconds(this.data.average);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.average-waiting-time-widget {
  .additional {
    max-width: 25px;
    font-size: 12px;
    font-weight: 500;
    color: $average-waiting-time-widget-additional-color;
    line-height: 10px;
  }
}
</style>
