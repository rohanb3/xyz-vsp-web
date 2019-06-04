<template>
  <div class="devices-page">
    <device-management-table class="device-management-table"/>
  </div>
</template>

<script>
import DeviceManagementTable from '@/containers/DeviceManagementTable';

export default {
  name: 'CustomersList',
  components: {
    DeviceManagementTable,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.devices-page {
  padding: $devices-list-padding;
  overflow: auto;
  height: 100%;
}
</style>
