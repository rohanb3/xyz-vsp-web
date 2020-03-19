<template>
  <div class="active-calls-table-container">
    <span class="active-calls-table-title">{{ $t('live.calls') }}</span>
    <div class="active-calls-table-wrapper">
      <wombat-table
        class="realtime-active-calls-wombat-table"
        :name="tableName"
        :items="rows"
        :columns="columns"
        :resize="false"
        :loadingItems="false"
        :columnsReorder="false"
      >
        <default-header-cell
          slot="header-cell"
          slot-scope="headerCell"
          :class="`${headerCell.column.name}-table-header-cell`"
          :column="headerCell.column"
        />
        <component
          slot="row-cell"
          slot-scope="rowCell"
          :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
          :item="rowCell.item"
          :column="rowCell.column"
          :class="`${rowCell.column.name}-table-cell`"
        />
      </wombat-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ENTITY_TYPES } from '@/constants';

import WombatTable from '@/components/WombatTable/Table';

import DefaultCell from '@/components/tableCells/DefaultCell';
import HoursTimeCounterCell from '@/components/tableCells/HoursTimeCounterCell';
import WaitingDurationCell from '@/components/tableCells/WaitingDurationCell';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';

import smartTable from '@/mixins/smartTable';

const { REALTIME_ACTIVE_CALLS } = ENTITY_TYPES;

export default {
  name: 'activeCallsTable',
  components: {
    DefaultCell,
    WombatTable,
    HoursTimeCounterCell,
    DefaultHeaderCell,
    WaitingDurationCell,
  },
  mixins: [smartTable],
  data() {
    return {
      tableName: REALTIME_ACTIVE_CALLS,
      rowComponentsHash: {
        default: 'DefaultCell',
        acceptedAt: 'HoursTimeCounterCell',
        waitingDuration: 'WaitingDurationCell',
      },
    };
  },
  computed: {
    ...mapGetters(['activeCalls']),
    rows() {
      return this.activeCalls.items || [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixins.scss';

.active-calls-table-container /deep/ {
  flex: 1.6;
  margin-left: 20px;
  .active-calls-table-wrapper {
    .realtime-active-calls-wombat-table .virtual-list {
      max-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 150px);
      min-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 150px);
    }
    .realtime-active-calls-wombat-table .no-result-found {
      margin-top: 35px;
      max-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 190px);
    }
  }
}

.active-calls-table-title {
  font-weight: bold;
  margin-left: 20px;
}

.companyName-table-cell,
.companyName-table-header-cell {
  margin-left: 15px;
}

.deviceName-table-cell,
.acceptedAt-table-cell,
.operatorName-table-cell,
.waitingDuration-table-cell,
.deviceName-table-header-cell,
.acceptedAt-table-header-cell,
.operatorName-table-header-cell,
.waitingDuration-table-header-cell {
  display: flex;
  justify-content: center;
  text-align: center;
}

.time-counter-cell {
  text-align: center;
}

.active-calls-table-wrapper {
  flex: 1;
  margin: 10px 0px 20px 20px;
  border-radius: 3px;
  border: 1px solid rgb(216, 216, 216);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
}
</style>
