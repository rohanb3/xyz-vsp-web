<template>
  <div class="calls-duration">
    <div class="calls-duration-toolbar">
      <div class="calls-duration-title">
        {{ $t('call.durations') }}
      </div>
    </div>

    <wombat-table
      v-if="rows && rows.length"
      :items="rows"
      :columns="columns"
      :item-height="50"
      :columnsReorder="false"
      :resize="false"
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
     </wombat-table>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import DefaultCell from '@/components/tableCells/DefaultCell';
import CallDurationCell from '@/components/tableCells/CallDurationCell';
import TresholdCell from '@/components/tableCells/TresholdCell';
import CallEfficiencyCell from '@/components/tableCells/CallEfficiencyCell';

import smartTable from '@/mixins/smartTable';

import { LOAD_CALLS_DURATION } from '@/store/storage/actionTypes';
import { CALLS_DURATION_TABLE } from '@/store/tables/constants';

export default {
  name: 'CallsDurationTable',
  components: {
    DefaultCell,
    WombatTable,
    WombatRow,
    CallDurationCell,
    CallEfficiencyCell,
    TresholdCell,
  },
  mixins: [smartTable],
  data() {
    return {
      tableName: CALLS_DURATION_TABLE,
      rowComponentsHash: {
        default: 'DefaultCell',
        callDuration: 'CallDurationCell',
        treshold: 'TresholdCell',
        callEfficiency: 'CallEfficiencyCell',
      },
    };
  },
  mounted() {
    if (!this.$store.state.storage.callsDuration.length) {
      this.$store.dispatch(LOAD_CALLS_DURATION);
    }
  },
  computed: {
    rows() {
      return this.$store.state.storage.callsDuration.map(item => ({
        ...item,
        height: '50px',
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.calls-duration {
  width: 50%;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 $table-shadow-color;

  .wombat-row.call-In.total {
    font-weight: 500;
  }
}

.calls-duration-toolbar {
  display: flex;
  flex-flow: row;
  height: 60px;
  align-items: center;
  padding: 0px 29px;
}

.calls-duration-title {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: $table-row-text-color;
}
</style>

<style lang="scss">
.calls-duration {
  .virtual-list {
    height: auto !important;
  }

  .wombat-table .column-type {
    padding-left: 26px;
  }
}
</style>
