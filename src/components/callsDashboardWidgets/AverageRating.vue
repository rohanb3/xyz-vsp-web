<template>
  <div class="widget-container">
    <div class="column">
      <span class="widget-title">{{$t('average.rating')}}</span>
      <div class="w-rating-container">
        <span class="widget-value">{{value}}</span>
        <v-rating
          class="rating"
          background-color="#b0b0b0"
          color="#ff941b"
          v-model="value"
          size="16"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AverageRating',
  props: ['value'],
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
  font-weight: bold;
  color: $base-orange;
}
.w-rating-container {
  display: flex;
}
.rating {
  display: flex;
  margin-top: -1px;
  margin-left: 4px;
}
</style>

<style lang="scss">
.w-rating-container .v-rating .v-icon {
  padding: 2px;
}
</style>