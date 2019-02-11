<template>
  <div class="widget-container">
    <div class="column">
      <span class="widget-title">{{$t('info')}}</span>
      <span class="widget-value">{{getFormatted(values.info)}}</span>
      <span class="widget-percent">{{getPercent(values.info)}}</span>
    </div>
    <div class="column">
      <span class="widget-title">{{$t('help')}}</span>
      <span class="widget-value">{{getFormatted(values.help)}}</span>
      <span class="widget-percent">{{getPercent(values.help)}}</span>
    </div>
    <div class="column">
      <span class="widget-title">{{$t('sale')}}</span>
      <span class="widget-value">{{getFormatted(values.sale)}}</span>
      <span class="widget-percent">{{getPercent(values.sale)}}</span>
    </div>
  </div>
</template>

<script>
import { addSpaceBetweenNumbers } from '@/services/stylesHelper';
import { getPercentage } from '@/services/commonHelper';

export default {
  name: 'TypesRate',
  props: ['values', 'total'],
  methods: {
    getFormatted(value) {
      return addSpaceBetweenNumbers(value);
    },
    getPercent(value) {
      return `${getPercentage(value, this.total, 1)}%`;
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
  display: flex;
  flex-wrap: wrap;
}
.column:not(:last-child) {
  margin-right: 15px;
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
.widget-percent {
  font-size: 12px;
  color: $base-grey;
  padding-left: 7px;
}
</style>
