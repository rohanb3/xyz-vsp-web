<template>
  <div class="device-history-table">
    <wombat-table
      :name="tableName"
      :items="rows"
      item-key-name="createdOn"
      :columns="columns"
      :item-height="50"
      :loading-items="false"
      :resize="false"
      :columns-reorder="false"
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
        <wombat-row
          :item="row.item"
          :columns="row.columns"
          :height="row.item.height"
        >
          <component
            slot="row-cell"
            slot-scope="rowCell"
            class="row-cell"
            :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
            :item="rowCell.item"
            :column="rowCell.column"
          />
        </wombat-row>
      </div>
    </wombat-table>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DeviceHistoryCreatedCell from '@/components/tableCells/DeviceHistoryCreatedCell';
import DeviceStatusCell from '@/components/tableCells/DeviceStatusCell';
import DeviceLocationStatusCell from '@/components/tableCells/DeviceLocationStatusCell';
import DeviceLocationCell from '@/components/tableCells/DeviceLocationCell';
import BranchLocationCell from '@/components/tableCells/BranchLocationCell';
import { getDeviceHistory } from '@/services/devicesRepository';
import { getDeviceHistoryTableColumns } from '@/services/tablesColumnsList';
import { CHANGE_ITEM } from '@/store/storage/mutationTypes';
import { ENTITY_TYPES } from '@/constants';

const { DEVICES } = ENTITY_TYPES;

export default {
  name: 'DeviceHistoryTable',
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  components: {
    WombatTable,
    WombatRow,
    DefaultHeaderCell,
    DefaultCell,
    DeviceHistoryCreatedCell,
    DeviceStatusCell,
    DeviceLocationStatusCell,
    DeviceLocationCell,
    BranchLocationCell,
  },
  data() {
    return {
      tableName: 'DEVICE_HISTORY_TABLE',
      rows: [],
      columns: getDeviceHistoryTableColumns(),
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
      },
      rowComponentsHash: {
        default: 'DefaultCell',
        createdOn: 'DeviceHistoryCreatedCell',
        status: 'DeviceStatusCell',
        locationStatus: 'DeviceLocationStatusCell',
        deviceLocation: 'DeviceLocationCell',
        branchLocation: 'BranchLocationCell',
      },
    };
  },
  mounted() {
    this.updateDeviceHistory();
    this.watchForDeviceChanges();
  },
  // computed: {
  //   history() {
  //     console.log(this.device.history);
  //     return this.device.history;
  //   },
  // },
  methods: {
    updateDeviceHistory() {
      const { id, udid } = this.device;
      return getDeviceHistory(id, udid).then((history = []) => {
        this.$store.commit(CHANGE_ITEM, {
          itemType: DEVICES,
          id,
          history,
          latitude: 100,
        });
      });
    },
    watchForDeviceChanges() {
      this.$store.watch(
        state => state.storage.devices.items.find(i => i.id === this.device.id),
        val => {
          console.log('changed', val);
          this.rows = val.history;
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.device-history-table /deep/ {
  .virtual-list {
    max-height: calc(
      100vh - #{$header-height} - #{$device-info-popup-header-height} - #{$table-header-height} -
        #{$device-info-popup-padding}
    );
  }
}
</style>
