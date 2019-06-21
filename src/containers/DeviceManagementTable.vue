<template>
  <div class="device-management-table">
    <div class="device-management-table-toolbar">
      <div class="devices-amount">{{ $t('device.management') }}</div>
      <!-- <v-btn @click.stop="showAddDevicePopup" class="add-device-button">
        <v-icon class="add-icon">add_circle</v-icon>
        {{ $t('add.device') }}
      </v-btn> -->
    </div>
    <lazy-load-table
      class="device-management-wombat-table"
      ref="devicesTable"
      :table-name="tableName"
      :disabled-item-field-selector="isDevicePending"
    >
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        @deviceIdSelected="onSelectId"
        @pendingDeviceSelected="showAddDevicePopup"
      />
    </lazy-load-table>
    <add-device-popup
      v-if="isAddDevicePopupShown"
      :visible-device="isAddDevicePopupShown"
      :device-id="selectedDeviceId"
      @close="closeAddDevicePopup"
      @saveDevice="onSaveDevice"
    />
    <device-management-updates :devices="rows" />
    <device-details
      :selected-device-id="selectedDeviceId"
      :tableName="tableName"
      v-if="deviceDetailsShow"
      @close="closeDeviceDetails"
    />
  </div>
</template>

<script>
import LazyLoadTable from '@/containers/LazyLoadTable';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DeviceIdCell from '@/components/tableCells/DeviceIdCell';
import DeviceUdidCell from '@/components/tableCells/DeviceUdidCell';
import DeviceStatusCell from '@/components/tableCells/DeviceStatusCell';
import DeviceLocationStatusCell from '@/components/tableCells/DeviceLocationStatusCell';
import DeviceStatusSinceCell from '@/components/tableCells/DeviceStatusSinceCell';
import DeviceCommentsCell from '@/components/tableCells/DeviceCommentsCell';
import IdCell from '../components/tableCells/IdCell';
import DeviceManagementUpdates from '@/containers/DeviceManagementUpdates';
import AddDevicePopup from '@/containers/AddDevicePopup';

import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { ENTITY_TYPES } from '@/constants';
import DeviceDetails from './DeviceDetails';

import { SET_FILTER, APPLYING_FILTERS_DONE } from '@/store/tables/mutationTypes';

import { addBackgroundShadow, removeBackgroundShadow } from '@/services/background';

import { updateDevice } from '@/services/devicesRepository';
import { errorMessage } from '@/services/notifications';

const { DEVICES, DEVICE_HISTORY, DEVICE_COMMENTS } = ENTITY_TYPES;

export default {
  name: 'DeviceManagementTable',
  components: {
    LazyLoadTable,
    DefaultHeaderCell,
    DefaultCell,
    DeviceIdCell,
    DeviceUdidCell,
    DeviceStatusCell,
    DeviceLocationStatusCell,
    DeviceStatusSinceCell,
    DeviceCommentsCell,
    IdCell,
    DeviceDetails,
    AddDevicePopup,
    DeviceManagementUpdates,
  },
  data() {
    return {
      tableName: DEVICES,
      loading: false,
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
      },
      rowComponentsHash: {
        default: 'DefaultCell',
        id: 'DeviceIdCell',
        udid: 'DeviceUdidCell',
        status: 'DeviceStatusCell',
        locationStatus: 'DeviceLocationStatusCell',
        statusSince: 'DeviceStatusSinceCell',
        comments: 'DeviceCommentsCell',
      },
      deviceCommentsShown: false,
      selectedDevice: null,
      deviceDetailsShow: false,
      isAddDevicePopupShown: false,
      selectedDeviceId: null,
    };
  },
  computed: {
    storageData() {
      return this.$store.state.storage[this.tableName] || {};
    },
    rows() {
      return this.storageData.items || [];
    },
  },
  methods: {
    setDeviceHsitorySelectedDevice(id) {
      const data = {
        tableName: DEVICE_HISTORY,
        filter: {
          name: 'deviceId',
          value: id,
        },
      };
      this.$store.commit(SET_FILTER, data);
      this.$store.commit(APPLYING_FILTERS_DONE, DEVICE_HISTORY);
    },
    onSelectId(deviceId) {
      try {
        this.selectedDeviceId = deviceId;
        this.setDeviceHsitorySelectedDevice(deviceId);
        const data = {
          tableName: DEVICE_COMMENTS,
          filters: [
            {
              name: 'id',
              value: deviceId,
            },
          ],
        };
        this.$store.dispatch(APPLY_FILTERS, data);
        this.deviceDetailsShow = true;
        addBackgroundShadow('device-management-table-toolbar');
      } catch (error) {
        console.error(error);
      }
    },
    closeDeviceDetails() {
      this.deviceDetailsShow = false;
      removeBackgroundShadow('device-management-table-toolbar');
    },
    showAddDevicePopup(id) {
      this.isAddDevicePopupShown = true;
      this.selectedDeviceId = id;
    },
    closeAddDevicePopup() {
      this.isAddDevicePopupShown = false;
      this.selectedDeviceId = null;
    },
    async onSaveDevice({ id, ...deviceInfo }) {
      try {
        await updateDevice(id, deviceInfo);
        await this.$refs.devicesTable.loadItems();
      } catch {
        errorMessage();
      }
    },
    isDevicePending(item) {
      return item.isPending;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixins.scss';

.device-management-table /deep/ {
  .device-management-wombat-table .virtual-list {
    max-height: calc(
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-header-height} - #{$device-management-table-toolbar-height}
    );
  }
  .device-management-wombat-table .column-comments {
    .header-cell {
      justify-content: center;
    }
  }

  .wombat-row.disabled {
    background-color: #f3f1f1;
    position: relative;
    border-bottom: none;

    &:after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      height: 1px;
      background-color: $table-row-border-color;
    }
  }
}

.device-management-table {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 $table-shadow-color;
  background-color: #fff;
}

.device-management-table-toolbar {
  display: flex;
  flex-flow: row;
  height: $device-management-table-toolbar-height;
  align-items: center;
  padding: 0px 29px;
}

.devices-amount {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: $table-row-text-color;
}

.device-management-table-footer {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
.dashboard-container {
  display: flex;
  padding: 15px 15px 5px 15px;
}
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background: transparent;
  box-shadow: none;
}
.add-device-button {
  width: 105px;
  height: 22px;
  border-radius: 11px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25) !important;
  background-color: #ffffff;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.7px;
  color: #398ffb;
  .add-icon {
    margin-right: 7px;
    width: 16px;
    height: 16px;
  }
}
</style>
