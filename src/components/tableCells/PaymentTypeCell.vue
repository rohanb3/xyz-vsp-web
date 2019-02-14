<template>
  <div class="payment-type-cell" :class="item.type">
    <span>{{ typeText }}</span>
  </div>
</template>

<script>
const STATUSES_TRANSLATE_KEYS = {
  next_monthly_payment: 'next.monthly.payment',
  monthly_payment: 'monthly.payment',
  purchased_more_agents: 'purchased.more.agents',
  update_to_enterprise_plan: 'update.to.enterprise.plan',
};

export default {
  name: 'PaymentTypeCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    typeText() {
      return this.item.type
        ? this.$t(STATUSES_TRANSLATE_KEYS[this.item.type])
        : '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.next_monthly_payment {
  color: $base-green;
}
</style>
