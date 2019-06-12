<template>
  <div
    class='device-status-since-cell'
    :class="{ 'device-online': item.isOnline, 'device-oflline': !item.isOnline }"
  >
    {{ date || watchedDate }}
  </div>
</template>

<script>
import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

const { DEFAULT_DATE_FORMAT } = DATE_FORMATS;

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
      return this.item.statusSince ? moment(this.item.statusSince).format(DEFAULT_DATE_FORMAT) : '';
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
