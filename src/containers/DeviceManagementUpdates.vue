<template>
    <div class="device-management-updates" />
</template>

<script>
import { ENTITY_TYPES } from '@/constants';
import {
  connect,
  disconnect,
  subscribeToDeviceChanges,
  unsubscribeFromDeviceChanges,
} from '@/services/deviceManagementSocket';
import { CHANGE_ITEM, UPSERT_ITEMS } from '@/store/storage/mutationTypes';

const { DEVICES, DEVICE_HISTORY } = ENTITY_TYPES;

export default {
  name: 'DeviceManagementUpdates',
  props: {
    devices: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    devicesUdids() {
      return this.devices.map(column => column.udid);
    },
    devicesTableData() {
      return this.$store.state.tables[DEVICE_HISTORY];
    },
    selectedDeviceId() {
      return this.devicesTableData.filters.deviceId;
    },
  },
  mounted() {
    connect(this.updateDevice);
  },
  watch: {
    devicesUdids(udids) {
      subscribeToDeviceChanges(udids);
    },
  },
  beforeDestroy() {
    unsubscribeFromDeviceChanges(this.deviceIds).finally(disconnect);
  },
  methods: {
    updateDevice(updates) {
      const { id, isInLocation, isOnline, ...newHistoryItem } = updates;
      const deviceUpdates = {
        id,
        isInLocation,
        isOnline,
      };
      this.$store.commit(CHANGE_ITEM, { itemType: DEVICES, ...deviceUpdates });

      if (id === this.selectedDeviceId) {
        this.$store.commit(UPSERT_ITEMS, {
          itemType: DEVICE_HISTORY,
          items: [{ ...newHistoryItem, isOnline, isInLocation }],
        });
      }
    },
  },
};
</script>
