<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t('status')"
      boundaries-selector=".device-management-table"
      :items="statusList"
      :useQuickBtn="false"
      :useSearchField="false"
      @select="toggleItem"
    />
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES, DEVICE_STATUS } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

export default {
  name: 'DeviceStatus',
  props: {
    tableName: {
      type: String,
      required: true,
    },
    sendFieldName: {
      type: String,
      default: 'id',
    },
  },
  components: {
    TableFilter,
  },
  mixins: [tableFilterAutocomplete],
  data() {
    return {
      filterName: FILTER_NAMES.STATUS,
      [FILTER_NAMES.STATUS]: [
        {
          id: DEVICE_STATUS.OFFLINE,
          [this.sendFieldName]: DEVICE_STATUS.OFFLINE,
          name: this.$t('offline'),
        },
        {
          id: DEVICE_STATUS.ONLINE,
          [this.sendFieldName]: DEVICE_STATUS.ONLINE,
          name: this.$t('online'),
        },
      ],
    };
  },
  computed: {
    statusList() {
      return this[this.filterName];
    },
  },
};
</script>
