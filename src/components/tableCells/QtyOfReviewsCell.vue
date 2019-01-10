<template>
  <div class='qty-of-reviews-cell'>
    <span class="total">{{total}}</span>
    <div class="ratio"><span class="positive">{{positive}}</span> / <span class="negative">{{negative}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'QtyOfReviewsCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    positive() {
      return parseFloat(this.item.qtyOfReviews.split('/')[0]);
    },
    negative() {
      return parseFloat(this.item.qtyOfReviews.split('/')[1]);
    },
    total() {
      return this.positive + this.negative;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.qty-of-reviews-cell {
  display: flex;
  align-items: baseline;
  .total {
    margin-right: 14px;
    font-size: 14px;
    color: $operators-table-qty-cell-total-color;
  }
  .ratio {
    display: flex;
    align-items: center;
    font-size: 11px;

    .positive {
      color: $operators-table-qty-cell-positive-color;
    }
    .negative {
      color: $operators-table-qty-cell-negative-color;
    }
  }
}
</style>
