<template>
  <div
    class='device-status-since-cell'
    :class="{ 'device-online': item.isOnline, 'device-oflline': !item.isOnline }"
  >
    {{ date }}
  </div>
</template>

<script>
import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

const { DEFAULT_DATE_FORMAT, DATE_FORMAT_WITH_TIME } = DATE_FORMATS;

export default {
  name: 'DeviceStatusSinceCell',
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      watchedDate: null,
    };
  },
  watch: {
    isOnline() {
      this.watchedDate = moment().format(DEFAULT_DATE_FORMAT);
    },
  },
  computed: {
    date() {
      const stillUtc = moment.utc(this.item.statusSince).toDate();

      return this.item.statusSince
        ? moment(stillUtc)
            .local()
            .format(DATE_FORMAT_WITH_TIME)
        : '';
    },
    isOnline() {
      return this.item.isOnline;
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
