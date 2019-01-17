<template>
  <div class="widget-container">
    <div class="title-cell">
      <span class="title-text">{{title}}</span>
    </div>
    <div class="value-cell">
      <span class="value-text">{{formattedValue}}</span>
      <div class="value-footer">
        <v-icon size="14" class="phone-icon">phone</v-icon>
        <span class="calls-text">{{$t('total.calls')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { addSpaceBetweenNumbers } from '@/services/stylesHelper';

export default {
  name: 'Effort',
  props: ['title', 'value'],
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
  width: 383px;
  height: 54px;
  display: flex;
}
.title-cell {
  display: flex;
  align-items: center;
  flex: 2.8;
  border-right: 1px solid rgba(151, 151, 151, 0.4);
}
.title-text {
  font-size: 24px;
  font-weight: 500;
  color: $base-text-color;
  padding-left: 24px;
}
.value-cell {
  display: flex;
  align-items: flex-end;
  flex: 1;
  flex-direction: column;
  padding-right: 14px;
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
  color: $base-blue;
  margin-right: 9px;
}
.calls-text {
  font-size: 12px;
  color: rgba(74, 74, 74, 0.6);
}
</style>