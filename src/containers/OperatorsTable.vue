<template>
  <div class="operators-table">
    <div class="operators-table-toolbar">
      <div class="operators-title">
        {{ $t('operators') }}
      </div>
       <v-spacer></v-spacer>
      <columns-list-editor
        :columns="columnsVisibilityData"
        :boundariesSelector="'.operators-table'"
        @visibilityChanged="onColumnVisibilityChanged"
        @revertToDefault="setDefaultColumns"
      />
    </div>

    <wombat-table
      v-if="rows && rows.length"
      :items="rows"
      :columns="columns"
      :item-height="50"
      :infinite-loading="!allOperatorsLoaded"
      @bottomReached="checkAndInsertOperators"
      @columnsResized="onColumnsResized"
      @columnsReordered="onColumnsReordered"
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
           />
         </wombat-row>

       </div>

       <div
         slot="footer"
         class="operators-table-footer wombat-footer"
       >
         <table-loader v-if="loading"/>
       </div>
     </wombat-table>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';
import WrapUpTimeCell from '@/components/tableCells/WrapUpTimeCell';
import AdditionalCell from '@/components/tableCells/AdditionalCell';
import LastReviewCell from '@/components/tableCells/LastReviewCell';
import QtyOfReviewsCell from '@/components/tableCells/QtyOfReviewsCell';
import ColumnsListEditor from '@/components/ColumnsListEditor';
import DefaultCell from '@/components/tableCells/DefaultCell';
import RatingCell from '@/components/tableCells/RatingCell';
import ScoreCell from '@/components/tableCells/ScoreCell';
import CallsAmountCell from '@/components/tableCells/CallsAmountCell';
import OperatorNameCell from '@/components/tableCells/OperatorNameCell';
import IdCell from '@/components/tableCells/IdCell';

import smartTable from '@/mixins/smartTable';

import { LOAD_OPERATORS, LOAD_ALL_OPERATORS_LENGTH } from '@/store/storage/actionTypes';
import { OPERATORS_TABLE } from '@/store/tables/constants';

import { getOperatorsTableColumns } from '@/store/tables/columnsList';

const allColumns = getOperatorsTableColumns()
  .map(({ name, title }) => ({
    name,
    title,
  }))
  .sort((first, second) => (first.title < second.title ? -1 : 1));

export default {
  name: 'OperatorsTable',
  components: {
    ColumnsListEditor,
    QtyOfReviewsCell,
    WrapUpTimeCell,
    LastReviewCell,
    AdditionalCell,
    DefaultCell,
    TableLoader,
    WombatTable,
    RatingCell,
    WombatRow,
    ScoreCell,
    CallsAmountCell,
    OperatorNameCell,
    IdCell,
  },
  mixins: [smartTable],
  data() {
    return {
      tableName: OPERATORS_TABLE,
      loading: false,
      rowComponentsHash: {
        qtyOfReviews: 'QtyOfReviewsCell',
        additional: 'AdditionalCell',
        lastReview: 'LastReviewCell',
        wrapUpTime: 'WrapUpTimeCell',
        default: 'DefaultCell',
        rating: 'RatingCell',
        calls: 'CallsAmountCell',
        score: 'ScoreCell',
        name: 'OperatorNameCell',
        id: 'IdCell',
      },
    };
  },
  mounted() {
    this.getAllOperatorsLength().then(this.insertOperators);
  },
  computed: {
    columnsVisibilityData() {
      // at first exclude additional column
      return allColumns.filter(column => column.name !== 'additional').map(column => ({
        ...column,
        visible: !!this.columns.find(c => c.name === column.name),
      }));
    },
    rows() {
      return this.$store.state.storage.operators.map(item => ({
        ...item,
        height: '50px',
      }));
    },
    allOperatorsLoaded() {
      return this.$store.getters.allOperatorsLoaded;
    },
  },
  methods: {
    checkAndInsertOperators() {
      if (!this.allOperatorsLoaded) {
        this.insertOperators();
      }
    },
    insertOperators() {
      this.loading = true;
      return this.$store.dispatch(LOAD_OPERATORS).then(() => {
        this.loading = false;
      });
    },
    getAllOperatorsLength() {
      return this.$store.dispatch(LOAD_ALL_OPERATORS_LENGTH);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.operators-table {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 $table-shadow-color;
}

.operators-table-toolbar {
  display: flex;
  flex-flow: row;
  height: 60px;
  align-items: center;
  padding: 0px 29px;
}

.operators-title {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: $table-row-text-color;
}

.operators-table-footer {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
</style>
