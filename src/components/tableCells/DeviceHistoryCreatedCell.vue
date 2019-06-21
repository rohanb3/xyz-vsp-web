<template>
  <div
    class='device-history-created-cell'
    :class="{ 'device-online': item.isOnline, 'device-oflline': !item.isOnline }"
  >
    {{ date }}
  </div>
</template>

<script>
import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

const { DEFAULT_DATE_FORMAT } = DATE_FORMATS;

export default {
  name: 'DeviceHistoryCreatedCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    date() {
      const stillUtc = moment.utc(this.item.createdOn).toDate();

      return moment(stillUtc)
        .local()
        .format(DEFAULT_DATE_FORMAT);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.device-oflline {
  color: $base-red;
}
.device-online {
  color: $base-green-text;
}
</style>
