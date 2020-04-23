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

import WombatTable from '@/components/WombatTable/Table';

import DefaultCell from '@/components/tableCells/DefaultCell';
import CallbacksMarkCell from '@/components/tableCells/CallbacksMarkCell';
import WaitingCallsWaitingDuraction from '@/components/tableCells/WaitingCallsWaitingDuraction';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';

import smartTable from '@/mixins/smartTable';

const { REALTIME_WAITING_CALLS } = ENTITY_TYPES;

export default {
  name: 'WaitingCallsTable',
  components: {
    DefaultCell,
    WombatTable,
    DefaultHeaderCell,
    CallbacksMarkCell,
    WaitingCallsWaitingDuraction,
  },
  mixins: [smartTable],
  data() {
    return {
      tableName: REALTIME_WAITING_CALLS,
      rowComponentsHash: {
        default: 'DefaultCell',
        callbacks: 'CallbacksMarkCell',
        requestedAt: 'WaitingCallsWaitingDuraction',
      },
    };
  },
  computed: {
    ...mapGetters(['allWaitingCalls']),
    rows() {
      return this.allWaitingCalls;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixins.scss';

.waiting-calls-table-container /deep/ {
  flex: 1;

  .waiting-calls-table-wrapper {
    .realtime-waiting-calls-wombat-table .virtual-list {
      max-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 150px);
      min-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 150px);
    }
    .realtime-waiting-calls-wombat-table .no-result-found {
      margin-top: 35px;
      max-height: calc(100vh - #{$header-height} - #{$realtime-dashboard-widgets-height} - 190px);
    }
  }

  .wombat-table .cell.column-callbacks {
    padding-left: 0px;
  }
}

.waiting-calls-table-title {
  font-weight: bold;
  margin-left: 20px;
}

.companyName-table-cell,
.companyName-table-header-cell {
  margin-left: 15px;
}

.requestedAt-table-header-cell {
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
