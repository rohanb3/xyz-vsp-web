<template>
  <div class='last-payment-cell'>
    {{ formattedDate }}
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'EmailCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    formattedDate() {
      return moment.utc(this.item.lastPayment).format('DD MMM YYYY');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.last-payment-cell {
  opacity: 0.56;
  font-size: 14px;
  color: $table-inactive-color;
}
</style>
