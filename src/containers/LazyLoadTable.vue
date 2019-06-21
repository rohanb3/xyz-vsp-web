<template>
  <div>
    <wombat-table
      :items="rows"
      :columns="columns"
      :infinite-loading="!allItemsLoaded"
      :item-key-name="itemKeyName"
      :loading-items="loading"
      :name="tableNameLowerCase"
      :resize="resize"
      :columns-reorder="columnsReorder"
      @bottomReached="checkAndLoadItems"
      @columnsResized="onColumnsResized"
      @columnsReordered="onColumnsReordered"
    >
      <component
        slot="header-cell"
        slot-scope="headerCell"
        class="header-cell"
        :is="
          headerComponentsHash[headerCell.column.fieldHeaderType] || headerComponentsHash.default
        "
        :column="headerCell.column"
      />
      <div
        v-if="rows && rows.length"
        slot="row"
        slot-scope="row"
        :class="{ blurred: applyingFilters }"
      >
        <wombat-row
          class="wombat-row"
          :item="row.item"
          :columns="row.columns"
          :height="row.item.height"
          :class="{ disabled: disabledItemFieldSelector(row.item) }"
        >
          <slot
            name="row-cell"
            slot="row-cell"
            slot-scope="rowCell"
            :column="rowCell.column"
            :item="rowCell.item"
          />
        </wombat-row>
      </div>
      <table-loader v-if="loading" slot="loader" />
    </wombat-table>
    <v-progress-circular
      v-if="applyingFilters"
      class="big-spinner"
      :size="70"
      :width="7"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';

import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';

export default {
  name: 'LazyLoadTable',
  components: {
    WombatTable,
    WombatRow,
    TableLoader,
    DefaultHeaderCell,
    SortingHeaderCell,
  },
  mixins: [configurableColumnsTable, lazyLoadTable],
  props: {
    tableName: {
      type: String,
      required: true,
    },
    itemKeyName: {
      type: String,
      default: 'id',
    },
    resize: {
      type: Boolean,
      default: true,
    },
    columnsReorder: {
      type: Boolean,
      default: true,
    },
    disabledItemFieldSelector: {
      type: Function,
      default: item => item.disabled,
    },
  },
  data() {
    return {
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
        sortingHeader: 'SortingHeaderCell',
      },
    };
  },
  computed: {
    tableNameLowerCase() {
      return this.tableName.toLowerCase();
    },
  },
};
</script>
