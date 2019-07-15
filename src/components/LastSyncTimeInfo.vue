<template>
  <div class="row-item last-sync-info">
    <p class="last-sync-info__title">{{ $t('last.synchronization.date') }}</p>
    <p>{{ time }}</p>
  </div>
</template>

<script>
import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

const { DEFAULT_DATE_FORMAT } = DATE_FORMATS;

export default {
  name: 'LastSyncTimeInfo',
  props: {
    syncTime: {
      type: String,
      required: true,
    },
  },
  computed: {
    time() {
      return moment
        .utc(this.syncTime)
        .local()
        .format(DEFAULT_DATE_FORMAT);
    },
  },
};
</script>

<style scoped lang="scss">
.last-sync-info {
  align-items: baseline;
  flex-direction: column;
  font-size: 14px;

  &__title {
    color: #999;
    font-size: 12px;
  }
}
</style>
