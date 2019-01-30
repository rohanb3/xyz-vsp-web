<template>
  <div class="calls-feedback-table">
    <div class="calls-feedback-toolbar">
      <div class="calls-feedback-title">
        {{ $t('call.feedbacks') }}
      </div>
    </div>

    <wombat-table
      name="calls-feedback"
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
import FeedbackQualityCell from '@/components/tableCells/FeedbackQualityCell';
import ServiceEficiencyCell from '@/components/tableCells/ServiceEficiencyCell';

import smartTable from '@/mixins/smartTable';

import { LOAD_CALLS_FEEDBACK } from '@/store/storage/actionTypes';
import { CALLS_FEEDBACK_TABLE } from '@/store/tables/constants';

export default {
  name: 'CallsFeedbackTable',
  components: {
    DefaultCell,
    WombatTable,
    WombatRow,
    FeedbackQualityCell,
    ServiceEficiencyCell,
  },
  mixins: [smartTable],
  data() {
    return {
      tableName: CALLS_FEEDBACK_TABLE,
      rowComponentsHash: {
        default: 'DefaultCell',
        feedbackQuality: 'FeedbackQualityCell',
        serviceEfficiency: 'ServiceEficiencyCell',
      },
    };
  },
  mounted() {
    if (!this.$store.state.storage.callsFeedback.length) {
      this.$store.dispatch(LOAD_CALLS_FEEDBACK);
    }
  },
  computed: {
    rows() {
      return this.$store.state.storage.callsFeedback.map(item => ({
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

.calls-feedback-table {
  @include table-base-container;
  margin-left: 9px;
  width: 50%;

  .wombat-row.call-In.total {
    font-weight: 500;
  }
}

.calls-feedback-toolbar {
  @include table-base-toolbar;
}

.calls-feedback-title {
  @include table-base-title;
}
</style>

<style lang="scss">
.calls-feedback-table {
  .virtual-list {
    height: auto !important;
  }

  .wombat-table .column-type {
    padding-left: 26px;
  }
}
</style>
