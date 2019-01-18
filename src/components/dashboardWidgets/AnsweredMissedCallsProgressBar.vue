<template>
  <div class="widget-container">
    <div class="value-cell">
      <span class="value-text">{{formattedValue.answered}}</span>
      <div class="value-footer">
        <v-icon size="14" class="phone-icon scoped-green">phone_callback</v-icon>
        <span class="calls-text scoped-green">{{$t('answered')}}</span>
      </div>
    </div>
    <v-progress-linear
      class="progress"
      height="10"
      background-color="#d0021b"
      color="#7ed321"
      :value="progressValue"
    ></v-progress-linear>
    <div class="value-cell">
      <span class="value-text">{{formattedValue.missed}}</span>
      <div class="value-footer">
        <v-icon size="14" class="phone-icon scoped-red">ring_volume</v-icon>
        <span class="calls-text scoped-red">{{$t('missed')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { addSpaceBetweenNumbers } from '@/services/stylesHelper';
import { getPercentage } from '@/services/commonHelper';

export default {
  name: 'AnsweredMissedCallsProgressBar',
  props: ['data'],
  computed: {
    formattedValue() {
      return {
        answered: addSpaceBetweenNumbers(this.data.answeredCalls),
        missed: addSpaceBetweenNumbers(this.data.missedCalls),
      };
    },
    progressValue() {
      return getPercentage(this.data.answeredCalls, this.data.totalCalls);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.widget-container {
  @include base-shadow-container;
  width: 491px;
  height: 54px;
  display: flex;
}
.value-cell {
  display: flex;
  align-items: flex-end;
  flex: 1;
  flex-direction: column;
  padding-left: 12px;
  padding-right: 12px;
}
.value-text {
  font-size: 24px;
  color: $base-text-color;
  display: flex;
  flex: 1;
}
.value-footer {
  display: flex;
  flex: 1;
  align-items: center;
}
.phone-icon {
  margin-right: 9px;
  &.scoped-green {
    color: $base-green;
  }
  &.scoped-red {
    color: $base-red;
  }
}
.calls-text {
  font-size: 12px;
  text-transform: lowercase;
  &.scoped-green {
    color: $base-green-text;
  }
  &.scoped-red {
    color: $base-red;
  }
}
.progress {
  border-radius: 8px;
}
</style>
