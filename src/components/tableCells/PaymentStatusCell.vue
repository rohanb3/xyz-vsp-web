<template>
  <div class="payment-status-cell" :class="item.status">
    <span>{{ statusText }}</span>
  </div>
</template>

<script>
const STATUSES_TRANSLATE_KEYS = {
  failed: 'failed',
  paid: 'paid',
  planned: 'planned',
};

export default {
  name: 'PaymentStatusCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    statusText() {
      return this.item.status ? this.$t(STATUSES_TRANSLATE_KEYS[this.item.status]) : '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.failed {
  color: $base-red;
}
.paid {
  color: $base-green;
}
.planned {
  color: $base-grey;
}
</style>
