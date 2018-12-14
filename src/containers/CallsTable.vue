<template>
  <div class="calls-table">
    <div class="calls-table-toolbar">
      <div class="calls-amount">
        {{ totalCallsAmount }} {{ $t('calls') }}
      </div>
      <v-spacer></v-spacer>
    </div>

    <wombat-table
      v-if="rows && rows.length"
      :items="rows"
      :columns="columns"
      :item-height="50"
      :resize="false"
      :infinite-loading="!allCallsLoaded"
      :scroll-on-items-update="true"
      @bottomReached="checkAndInsertCalls"
     >
       <div
         v-if="rows && rows.length"
         slot="row"
         slot-scope="row"
       >
         <wombat-row
           :item="row.item"
           :columns="row.columns"
           :height="row.item.height"
           :class="`call-${row.item.type}`"
         >
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
         </wombat-row>

       </div>

       <div
         slot="footer"
         class="calls-table-footer wombat-footer"
       >
         <table-loader v-if="loading"/>
       </div>
     </wombat-table>
     <client-feedback-card
       v-if="clientFeedbackShown"
       :call="selectedCall"
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
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DateCell from '@/components/tableCells/DateCell';
import CallTypeCell from '@/components/tableCells/CallTypeCell';
import WaitTimeCell from '@/components/tableCells/WaitTimeCell';
import DurationCell from '@/components/tableCells/DurationCell';
import RatingCell from '@/components/tableCells/RatingCell';
import StatusCell from '@/components/tableCells/StatusCell';
import ClientFeedbackCell from '@/components/tableCells/ClientFeedbackCell';
import OperatorFeedbackCell from '@/components/tableCells/OperatorFeedbackCell';
import ClientFeedbackCard from '@/components/ClientFeedbackCard';
import OperatorFeedbackCard from '@/components/OperatorFeedbackCard';

import { LOAD_CALLS, LOAD_ALL_CALLS_LENGTH } from '@/store/storage/actionTypes';
import { getCallsTableColumns } from '@/services/tableColumns';

export default {
  name: 'CallsTable',
  components: {
    WombatTable,
    WombatRow,
    DefaultCell,
    DateCell,
    CallTypeCell,
    WaitTimeCell,
    DurationCell,
    RatingCell,
    StatusCell,
    ClientFeedbackCell,
    OperatorFeedbackCell,
    TableLoader,
    ClientFeedbackCard,
    OperatorFeedbackCard,
  },
  data() {
    return {
      loading: false,
      columns: getCallsTableColumns(),
      rowComponentsHash: {
        default: 'DefaultCell',
        date: 'DateCell',
        type: 'CallTypeCell',
        waitTime: 'WaitTimeCell',
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
  mounted() {
    this.getAllCallsLength().then(this.insertCalls);
  },
  computed: {
    rows() {
      return this.$store.state.storage.calls.map(item => ({
        ...item,
        height: '50px',
      }));
    },
    totalCallsAmount() {
      return this.$store.state.storage.allCallsLength;
    },
    allCallsLoaded() {
      return this.$store.getters.allCallsLoaded;
    },
  },
  methods: {
    async checkAndInsertCalls() {
      if (!this.allCallsLoaded) {
        await this.insertCalls();
      }
    },
    insertCalls() {
      this.loading = true;
      return this.$store.dispatch(LOAD_CALLS).then(() => {
        this.loading = false;
      });
    },
    getAllCallsLength() {
      return this.$store.dispatch(LOAD_ALL_CALLS_LENGTH);
    },
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

.calls-table {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 $table-shadow-color;
}

.calls-table-toolbar {
  display: flex;
  flex-flow: row;
  height: $calls-table-header-height;
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
</style>
