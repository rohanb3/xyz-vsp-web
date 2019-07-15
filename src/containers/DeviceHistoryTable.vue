<template>
  <div class="device-history-table">
    <lazy-load-table item-key-name="createdOn" :tableName="tableName" :resize="false" :columns-reorder="false">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        :filter="rowCell.column.filter"
      />
    </lazy-load-table>
  </div>
</template>

<script>
import LazyLoadTable from '@/containers/LazyLoadTable';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DeviceHistoryCreatedCell from '@/components/tableCells/DeviceHistoryCreatedCell';
import DeviceStatusCell from '@/components/tableCells/DeviceStatusCell';
import DeviceLocationStatusCell from '@/components/tableCells/DeviceLocationStatusCell';
import DeviceLocationCell from '@/components/tableCells/DeviceLocationCell';
import BranchLocationCell from '@/components/tableCells/BranchLocationCell';
import { ENTITY_TYPES } from '@/constants';

const { DEVICE_HISTORY } = ENTITY_TYPES;

export default {
  name: 'DeviceHistoryTable',
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  components: {
    LazyLoadTable,
    DefaultCell,
    DeviceHistoryCreatedCell,
    DeviceStatusCell,
    DeviceLocationStatusCell,
    DeviceLocationCell,
    BranchLocationCell,
  },
  data() {
    return {
      tableName: DEVICE_HISTORY,
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
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.device-history-table /deep/ {
  .virtual-list {
    max-height: calc(
      100vh - #{$header-height} - #{$device-info-popup-header-height} - #{$table-header-height} - #{$device-info-popup-padding}
    );
  }
}
</style>
