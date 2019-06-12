<template>
  <div class="calls-table">
    <div class="calls-table-toolbar">
      <div class="calls-amount">{{ totalItems }} {{ $t('calls') }}</div>
    </div>
    <lazy-load-table :tableName="tableName">
      <component
        slot="header-cell"
        slot-scope="headerCell"
        class="header-cell"
        :is="
          headerComponentsHash[headerCell.column.fieldHeaderType] || headerComponentsHash.default
        "
        :column="headerCell.column"
      />
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        @clientFeedbackClick="showClientFeedback"
        @operatorFeedbackClick="showOperatorFeedback"
      />
    </lazy-load-table>
    <client-feedback-card
      v-if="clientFeedbackShown"
      :call="selectedCall"
      :is-super-admin="isSuperAdmin"
      @close="closeClientFeedback"
    />
    <operator-feedback-card
      v-if="operatorFeedbackShown"
      :call="selectedCall"
      @close="closeOperatorFeedback"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import LazyLoadTable from '@/containers/LazyLoadTable';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DateCell from '@/components/tableCells/DateCell';
import CallTypeCell from '@/components/tableCells/CallTypeCell';
import DurationCell from '@/components/tableCells/DurationCell';
import RatingCell from '@/components/tableCells/RatingCell';
import StatusCell from '@/components/tableCells/StatusCell';
import ClientFeedbackCell from '@/components/tableCells/ClientFeedbackCell';
import OperatorFeedbackCell from '@/components/tableCells/OperatorFeedbackCell';
import ClientFeedbackCard from '@/components/ClientFeedbackCard';
import OperatorFeedbackCard from '@/components/OperatorFeedbackCard';
import TableDatesEditor from '@/components/TableDatesEditor';
import ColumnsListEditor from '@/components/ColumnsListEditor';
import CallsDashboard from '@/components/CallsDashboard';

import { ENTITY_TYPES } from '@/constants';

const operationAdminOnlyColumns = ['company'];
const { CALLS } = ENTITY_TYPES;

export default {
  name: 'CallsTable',
  components: {
    LazyLoadTable,
    DefaultHeaderCell,
    DefaultCell,
    DateCell,
    CallTypeCell,
    DurationCell,
    RatingCell,
    StatusCell,
    ClientFeedbackCell,
    OperatorFeedbackCell,
    ClientFeedbackCard,
    OperatorFeedbackCard,
    TableDatesEditor,
    ColumnsListEditor,
    CallsDashboard,
  },
  data() {
    return {
      tableName: CALLS,
      loading: false,
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
      },
      rowComponentsHash: {
        default: 'DefaultCell',
        date: 'DateCell',
        type: 'CallTypeCell',
        duration: 'DurationCell',
        rating: 'RatingCell',
        status: 'StatusCell',
        clientFeedback: 'ClientFeedbackCell',
        operatorFeedback: 'OperatorFeedbackCell',
      },
      clientFeedbackShown: false,
      operatorFeedbackShown: false,
      selectedCall: null,
    };
  },
  computed: {
    ...mapGetters(['isOperationAdmin', 'isSuperAdmin']),
    columns() {
      return this.tableData.columns.filter(
        column => this.isOperationAdmin || !operationAdminOnlyColumns.includes(column.name)
      );
    },
    storageData() {
      return this.$store.state.storage[this.tableName] || {};
    },
    totalItems() {
      return this.storageData.total;
    },
  },
  methods: {
    showClientFeedback(id) {
      this.selectCallById(id);
      this.clientFeedbackShown = true;
    },
    closeClientFeedback() {
      this.selectedCall = null;
      this.clientFeedbackShown = false;
    },
    showOperatorFeedback(id) {
      this.selectCallById(id);
      this.operatorFeedbackShown = true;
    },
    closeOperatorFeedback() {
      this.selectedCall = null;
      this.operatorFeedbackShown = false;
    },
    selectCallById(id) {
      const call = this.rows.find(row => row.id === id);
      this.selectedCall = call;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixins.scss';

.calls-table /deep/ {
  .virtual-list {
    max-height: calc(
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-header-height} - #{$calls-table-toolbar-height}
    );
  }
  .wombat-row.call-missed {
    background-color: $calls-missed-call-background-color;

    .column-type {
      @include inactive-cell;
    }
  }
  .column-duration,
  .column-rating,
  .column-clientfeedback,
  .column-operatorfeedback,
  .column-type {
    .header-cell {
      justify-content: center;
    }
  }
}

.calls-table {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 $table-shadow-color;
  background-color: #fff;
}

.calls-table-toolbar {
  display: flex;
  flex-flow: row;
  height: $calls-table-toolbar-height;
  align-items: center;
  padding: 0px 29px;
}

.calls-amount {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: $table-row-text-color;
}

.calls-table-footer {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
.dashboard-container {
  display: flex;
  padding: 15px 15px 5px 15px;
}
</style>
