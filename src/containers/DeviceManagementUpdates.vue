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
import { CHANGE_ITEM } from '@/store/storage/mutationTypes';

const { DEVICES } = ENTITY_TYPES;

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
      this.$store.commit(CHANGE_ITEM, { itemType: DEVICES, ...updates });
    },
  },
};
</script>
