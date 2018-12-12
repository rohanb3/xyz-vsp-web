<template>
  <div class='date-cell'>
    <span>{{ date }}</span>
  </div>
</template>

<script>
import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/constants/dateFormats';

export default {
  name: 'DateCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    date() {
      return moment(this.item.date).format(DEFAULT_DATE_FORMAT);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
