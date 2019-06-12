<template>
  <div class="device-management-table">
    <div class="device-management-table-toolbar">
      <div class="devices-amount">{{ $t('device.management') }}</div>
      <v-btn @click.stop="showAddDevicePopup" class="add-device-button">
        <v-icon class="add-icon">add_circle</v-icon>
        {{ $t('add.device') }}
      </v-btn>
    </div>
    <wombat-table
      class="device-management-wombat-table"
      :name="tableName"
      :items="rows"
      :columns="columns"
      :item-height="50"
      :infinite-loading="!allItemsLoaded"
      :loading-items="loading"
      @bottomReached="checkAndLoadItems"
      @columnsResized="onColumnsResized"
      @columnsReordered="onColumnsReordered"
    >
      <component
        slot="header-cell"
        slot-scope="headerCell"
        class="header-cell"
        :is="
          headerComponentsHash[headerCell.column.fieldHeaderType] || headerComponentsHash.default
        "
        :column="headerCell.column"
      />
      <div v-if="rows && rows.length" slot="row" slot-scope="row">
        <wombat-row :item="row.item" :columns="row.columns" :height="row.item.height">
          <component
            slot="row-cell"
            slot-scope="rowCell"
            class="row-cell"
            :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
            :item="rowCell.item"
            :column="rowCell.column"
            @selectId="onSelectId"
          />
        </wombat-row>
      </div>

      <table-loader v-if="loading" slot="loader"/>
    </wombat-table>
    <add-device-popup
      v-if="isAddDevicePopupShown"
      :visible-device="isAddDevicePopupShown"
      @close="closeAddDevicePopup"
      @saveDevice="onSaveDevice"
    />
    <device-management-updates :devices="rows" />
    <device-details
      v-if="deviceDetailsShow"
      :tableName="tableName"
      :selected-device-id="selectedDeviceId"
      @close="closeDeviceDetails"
    />
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DeviceStatusCell from '@/components/tableCells/DeviceStatusCell';
import DeviceLocationStatusCell from '@/components/tableCells/DeviceLocationStatusCell';
import DeviceStatusSinceCell from '@/components/tableCells/DeviceStatusSinceCell';
import DeviceCommentsCell from '@/components/tableCells/DeviceCommentsCell';
import IdCell from '../components/tableCells/IdCell';
import DeviceManagementUpdates from '@/containers/DeviceManagementUpdates';
import AddDevicePopup from '@/containers/AddDevicePopup';

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { ENTITY_TYPES } from '@/constants';
import DeviceDetails from './DeviceDetails';

import { SET_FILTER, APPLYING_FILTERS_DONE } from '@/store/tables/mutationTypes';

import { addBackgroundShadow, removeBackgroundShadow } from '@/services/background';

import { createDevice } from '@/services/devicesRepository';
import { errorMessage } from '@/services/notifications';
import DeviceDetailsTab from '@/components/DeviceDetailsTab';

const { DEVICES, DEVICE_HISTORY } = ENTITY_TYPES;

export default {
  name: 'devicesTable',
  components: {
    DeviceDetailsTab,
    WombatTable,
    WombatRow,
    DefaultHeaderCell,
    DefaultCell,
    DeviceStatusCell,
    DeviceLocationStatusCell,
    DeviceStatusSinceCell,
    DeviceCommentsCell,
    TableLoader,
    IdCell,
    DeviceDetails,
    AddDevicePopup,
    DeviceManagementUpdates,
  },
  mixins: [configurableColumnsTable, lazyLoadTable],
  data() {
    return {
      tableName: DEVICES,
      loading: false,
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
      },
      rowComponentsHash: {
        default: 'DefaultCell',
        status: 'DeviceStatusCell',
        locationStatus: 'DeviceLocationStatusCell',
        statusSince: 'DeviceStatusSinceCell',
        comments: 'DeviceCommentsCell',
        id: 'IdCell',
      },
      deviceCommentsShown: false,
      deviceDetailsShow: false,
      isAddDevicePopupShown: false,
      selectedDeviceId: null,
    };
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
        this.deviceDetailsShow = true;
        addBackgroundShadow('device-management-table-toolbar');
      } catch (error) {
        console.log(error);
      }
    },
    closeDeviceDetails() {
      this.deviceDetailsShow = false;
      removeBackgroundShadow('device-management-table-toolbar');
    },
    showAddDevicePopup() {
      this.isAddDevicePopupShown = true;
    },
    closeAddDevicePopup() {
      this.isAddDevicePopupShown = false;
    },
    async onSaveDevice(deviceInfo) {
      try {
        await createDevice(deviceInfo);
        await this.loadItems();
      } catch {
        errorMessage();
      }
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
