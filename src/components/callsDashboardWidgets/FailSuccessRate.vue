<template>
  <div class="widget-container">
    <div class="column">
      <span class="widget-title">{{$t('fail')}}</span>
      <span class="widget-value w-red">{{getFormatted(values.fail)}}</span>
      <span class="widget-percent">{{getPercent(values.fail)}}</span>
    </div>
    <div class="column">
      <span class="widget-title">{{$t('success')}}</span>
      <span class="widget-value w-green">{{getFormatted(values.success)}}</span>
      <span class="widget-percent">{{getPercent(values.success)}}</span>
    </div>
    <div class="column">
      <span class="widget-title">{{$t('no.rated')}}</span>
      <span class="widget-value w-grey">{{getFormatted(values.noRated)}}</span>
      <span class="widget-percent">{{getPercent(values.noRated)}}</span>
    </div>
  </div>
</template>

<script>
import { addSpaceBetweenNumbers } from '@/services/stylesHelper';
import { getPercentage } from '@/services/commonHelper';

export default {
  name: 'FailSuccessRate',
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
  &.w-red {
    color: $base-red;
  }
  &.w-green {
    color: $base-green;
  }
  &.w-grey {
    color: $base-grey;
  }
}
.widget-percent {
  font-size: 12px;
  color: $base-grey;
  padding-left: 7px;
}
</style>
