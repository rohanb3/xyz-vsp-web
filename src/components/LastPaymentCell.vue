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
.email-cell {
  a {
    color: #398ffb;
    text-decoration: none;
  }
}
</style>
