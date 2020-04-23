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
import { getDifference } from '@/services/dateHelper';

import WombatTable from '@/components/WombatTable/Table';

import DefaultCell from '@/components/tableCells/DefaultCell';
import CallbacksMarkCell from '@/components/tableCells/CallbacksMarkCell';
import ActiveCallDurationCell from '@/components/tableCells/ActiveCallDurationCell';
import WaitingDurationCell from '@/components/tableCells/WaitingDurationCell';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';

import smartTable from '@/mixins/smartTable';

const { REALTIME_ACTIVE_CALLS } = ENTITY_TYPES;

export default {
  name: 'activeCallsTable',
  components: {
    DefaultCell,
    WombatTable,
    CallbacksMarkCell,
    ActiveCallDurationCell,
    DefaultHeaderCell,
    WaitingDurationCell,
  },
  mixins: [smartTable],
  data() {
    return {
      tableName: REALTIME_ACTIVE_CALLS,
      rowComponentsHash: {
        default: 'DefaultCell',
        callbacks: 'CallbacksMarkCell',
        acceptedAt: 'ActiveCallDurationCell',
        waitingDuration: 'WaitingDurationCell',
      },
    };
  },
  computed: {
    ...mapGetters(['activeCalls']),
    rows() {
      if (this.activeCalls.items && this.activeCalls.items.length !== 0) {
        return this.activeCalls.items.slice().sort((prev, next) => {
          if (prev.callbacks && prev.callbacks.length && next.callbacks && next.callbacks.length) {
            return getDifference(
              prev.callbacks[prev.callbacks.length - 1].acceptedAt,
              next.callbacks[next.callbacks.length - 1].acceptedAt
            );
          }
          if (!prev.callbacks && !next.callbacks) {
            return getDifference(prev.acceptedAt, next.acceptedAt);
          }
          if (prev.callbacks && prev.callbacks.length && !next.callbacks) {
            return -1;
          }
          if (!prev.callbacks && next.callbacks && next.callbacks.length) {
            return 1;
          }
          return 0;
        });
      }
      return [];
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
    .realtime-active-calls-wombat-table .cell:first-child {
      padding: 0;
    }
  }
}

.active-calls-table-title {
  font-weight: bold;
  margin-left: 20px;
}

.acceptedAt-table-cell,
.acceptedAt-table-header-cell {
  margin-left: 15px;
}

.active-calls-table-wrapper {
  flex: 1;
  margin: 10px 0px 20px 20px;
  border-radius: 3px;
  border: 1px solid rgb(216, 216, 216);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
}
</style>
