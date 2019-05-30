<template>
  <div class="created-cell">{{ formattedDate }}</div>
</template>

<script>
import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

const { SHORT_DAY_SHORT_MONTH_FULL_YEAR } = DATE_FORMATS;

export default {
  name: 'CreatedCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    formattedDate() {
      return moment.utc(this.item.created).format(SHORT_DAY_SHORT_MONTH_FULL_YEAR);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.created-cell {
  opacity: 0.56;
  font-size: 14px;
  color: $table-inactive-color;
}
</style>
