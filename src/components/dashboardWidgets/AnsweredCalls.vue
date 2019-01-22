<template>
  <div class="widget-container">
    <span class="value-text">{{formattedValue}}</span>
    <div class="value-footer">
      <v-icon size="14" class="phone-icon">phone_callback</v-icon>
      <span class="calls-text">{{$t('answered')}}</span>
    </div>
  </div>
</template>

<script>
import { addSpaceBetweenNumbers } from '@/services/stylesHelper';

export default {
  name: 'AnsweredCalls',
  props: ['value'],
  computed: {
    formattedValue() {
      return addSpaceBetweenNumbers(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.widget-container {
  @include base-shadow-container;
  width: 99;
  height: 54px;
  display: flex;
  align-items: flex-end;
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
  color: $base-green;
}
.calls-text {
  font-size: 12px;
  text-transform: lowercase;
  color: $base-green-text;
}
</style>
