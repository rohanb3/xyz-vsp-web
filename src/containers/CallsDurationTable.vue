<template>
  <div class="calls-duration-table">
    <div class="calls-duration-toolbar">
      <div class="calls-duration-title">
        {{ $t('call.durations') }}
      </div>
    </div>

    <wombat-table
      name="calls-duration"
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
import { CALLS_DURATION_TABLE } from '@/constants/tablesNames';

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
@import '@/assets/styles/mixins.scss';

.calls-duration-table {
  @include table-base-container;
  width: 50%;

  .wombat-row.call-In.total {
    font-weight: 500;
  }
}

.calls-duration-toolbar {
  @include table-base-toolbar;
}

.calls-duration-title {
  @include table-base-title;
}
</style>

<style lang="scss">
.calls-duration-table {
  .virtual-list {
    height: auto !important;
  }

  .wombat-table .column-type {
    padding-left: 26px;
  }
}
</style>
