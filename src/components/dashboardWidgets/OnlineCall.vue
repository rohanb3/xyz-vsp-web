<template>
  <div class="widget-container">
    <span class="value-text">{{formattedValue}}</span>
    <span class="calls-text">{{$t('online.for.call')}}</span>
  </div>
</template>

<script>
import { secondsToMinutesSeconds } from '@/services/dateHelper';

export default {
  name: 'OnlineCall',
  props: ['value'],
  computed: {
    formattedValue() {
      return secondsToMinutesSeconds(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.widget-container {
  @include base-shadow-container;
  width: 106px;
  height: 54px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 17px;
}
.value-text {
  font-size: 16px;
  color: rgba(74, 74, 74, 0.7);
  padding-top: 7px;
}
.calls-text {
  font-size: 12px;
  color: rgba(74, 74, 74, 0.6);
  padding-bottom: 3px;
}
</style>
