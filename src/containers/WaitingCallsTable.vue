<template>
  <div class="waiting-calls-table-container">
    <span class="waiting-calls-table-title">{{ $t('waiting.calls') }}</span>
    <div class="waiting-calls-table-wrapper">
      <wombat-table
        class="realtime-waiting-calls-wombat-table"
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

import DefaultCell from '@/components/tableCells/DefaultCell';
import TimeCounterCell from '@/components/tableCells/TimeCounterCell';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';

import WombatTable from '@/components/WombatTable/Table';

import smartTable from '@/mixins/smartTable';

const { REALTIME_WAITING_CALLS } = ENTITY_TYPES;

export default {
  name: 'WaitingCallsTable',
  components: {
    DefaultCell,
    WombatTable,
    TimeCounterCell,
    DefaultHeaderCell,
  },
  mixins: [smartTable],
  data() {
    return {
      tableName: REALTIME_WAITING_CALLS,
      rowComponentsHash: {
        default: 'DefaultCell',
        requestedAt: 'TimeCounterCell',
      },
    };
  },
  computed: {
    ...mapGetters(['waitingCalls']),
    rows() {
      return this.waitingCalls.items || [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixins.scss';

.waiting-calls-table-container /deep/ {
  .waiting-calls-table-wrapper {
    .realtime-waiting-calls-wombat-table .virtual-list {
      max-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 150px);
      min-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 150px);
    }
    .realtime-waiting-calls-wombat-table .no-result-found {
      max-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 190px);
    }
  }
}

.waiting-calls-table-title {
  font-weight: bold;
  margin-left: 20px;
}

.requestedBy-table-cell,
.requestedBy-table-header-cell {
  margin-left: 15px;
}

.deviceId-table-cell,
.waitingTime-table-cell,
.deviceId-table-header-cell,
.waitingTime-table-header-cell {
  display: flex;
  justify-content: center;
}

.time-counter-cell {
  text-align: center;
}

.waiting-calls-table-wrapper {
  flex: 1;
  margin: 10px 0px 20px 20px;
  border-radius: 3px;
  border: 1px solid rgb(216, 216, 216);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
}
</style>

<style>
/* .waiting-calls-table-container
  .waiting-calls-table-wrapper
  .realtimeWaitingCalls
  .no-result-found {
  height: 100% !important;
}
.waiting-calls-table-container
  .waiting-calls-table-wrapper
  .realtimeWaitingCalls
  .scroller {
  max-height: 100%;
} */
</style>
