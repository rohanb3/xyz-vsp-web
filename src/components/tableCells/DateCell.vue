<template>
  <div class='date-cell'>
    <span>{{ date }}</span>
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
  },
  computed: {
    date() {
      return moment(this.item.date || this.item.createOn).format(DEFAULT_DATE_FORMAT);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
