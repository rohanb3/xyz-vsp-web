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
    <DeviceHistory
      :tableName="tableName"
      v-if="deviceHistoryShow"
      @close="close"
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
import DeviceLocationCell from '@/components/tableCells/DeviceLocationCell';
import DeviceStatusSinceCell from '@/components/tableCells/DeviceStatusSinceCell';
import DeviceCommentsCell from '@/components/tableCells/DeviceCommentsCell';
import IdCell from '../components/tableCells/IdCell';
import DeviceManagementUpdates from '@/containers/DeviceManagementUpdates';

import AddDevicePopup from '@/containers/AddDevicePopup';

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { ENTITY_TYPES } from '@/constants';
import DeviceHistory from './DeviceHistory';

import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { addBackground, removeBackground } from '../services/utils';

import { createDevice } from '@/services/devicesRepository';
import { errorMessage } from '@/services/notifications';

const { DEVICES } = ENTITY_TYPES;

export default {
  name: 'devicesTable',
  components: {
    WombatTable,
    WombatRow,
    DefaultHeaderCell,
    DefaultCell,
    DeviceStatusCell,
    DeviceLocationCell,
    DeviceStatusSinceCell,
    DeviceCommentsCell,
    TableLoader,
    IdCell,
    DeviceHistory,
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
        locationStatus: 'DeviceLocationCell',
        statusSince: 'DeviceStatusSinceCell',
        comments: 'DeviceCommentsCell',
        id: 'IdCell',
      },
      deviceCommentsShown: false,
      selectedDevice: null,
      deviceHistoryShow: false,
      isAddDevicePopupShown: false,
    };
  },
  methods: {
    showDeviceComments(id) {
      this.selectDeviceById(id);
      this.deviceCommentsShown = true;
    },
    closeDeviceComments() {
      this.selectedDevice = null;
      this.deviceCommentsShown = false;
    },
    selectDeviceById(id) {
      const device = this.rows.find(row => row.id === id);
      this.selectedDevice = device;
    },
    onSelectId(deviceId) {
      try {
        const data = {
          tableName: DEVICES,
          filters: [
            {
              name: DEVICES,
              value: deviceId,
            },
          ],
        };
        this.$store.dispatch(APPLY_FILTERS, data);
        this.deviceHistoryShow = true;
        addBackground('device-management-table-toolbar');
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.deviceHistoryShow = false;
      removeBackground('device-management-table-toolbar');
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
  .virtual-list {
    max-height: calc(
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-header-height} - #{$device-management-table-toolbar-height}
    );
  }
  .column-comments {
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
