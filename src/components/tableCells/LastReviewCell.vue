<template>
  <div class='last-review-cell'>
    {{ formattedDate }}
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'LastReviewCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    formattedDate() {
      return moment.utc(this.item.lastReview).format('DD MMM YYYY');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.last-review-cell {
  opacity: 0.56;
  font-size: 14px;
  color: $table-inactive-color;
}
</style>
