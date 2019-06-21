<template>
  <div class='date-cell' :title="filteredDate">
    <span>{{ filteredDate }}</span>
  </div>
</template>

<script>
import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

const { DEFAULT_DATE_FORMAT } = DATE_FORMATS;

export default {
  name: 'DateCell',
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
  },
  computed: {
    filteredDate() {
      return moment(this.date).format(DEFAULT_DATE_FORMAT);
    },
    date() {
      return this.item[this.column.field] || this.item.date;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
