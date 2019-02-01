<template>
  <div class="configurable-lazy-load-table" :class="`${displayName}-table ${name}`">
    <div class="configurable-lazy-load-table-toolbar" :class="`${displayName}-table-toolbar`">
      <div class="configurable-lazy-load-table-title" :class="`${displayName}-table-title`">
       {{ filteredItemsLength }} {{ $t(displayName) }}
       </div>
      <v-spacer></v-spacer>
      <table-dates-editor
        v-if="showDatesEditor"
        :startDate="startDate"
        :endDate="endDate"
        :boundariesSelector="`.${displayName}-table`"
        @applyDateRange="setDateRange"
      />
      <columns-list-editor
        v-if="showColumnsListEditor"
        :columns="columnsVisibilityData"
        :boundariesSelector="`.${displayName}-table`"
        @visibilityChanged="onColumnVisibilityChanged"
        @revertToDefault="setDefaultColumns"
      />
    </div>
    <wombat-table
      v-if="rows && rows.length"
      :items="rows"
      :columns="columns"
      :item-height="50"
      :infinite-loading="!allItemsLoaded"
      @bottomReached="checkAndLoadItems"
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
             @click="handleClick"
           />
         </wombat-row>

       </div>

       <div
         slot="footer"
         class="configurable-lazy-load-table-footer wombat-footer"
         :class="`${displayName}-table-footer`"
       >
         <table-loader v-if="loading"/>
       </div>
     </wombat-table>
     <slot name="drawer"></slot>
  </div>
</template>

<script>
import { getTableConfig } from '@/services/tablesConfig';

import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';
import TableDatesEditor from '@/components/TableDatesEditor';
import ColumnsListEditor from '@/components/ColumnsListEditor';

import smartTable from '@/mixins/smartTable';

export default {
  name: 'ConfigurableLazyLoadTable',
  components: {
    WombatTable,
    WombatRow,
    TableLoader,
    TableDatesEditor,
    ColumnsListEditor,
  },
  mixins: [smartTable],
  props: {
    displayName: {
      type: String,
    },
    name: {
      type: String,
    },
    selectedId: {
      type: String,
    },
    handleCellClick: {
      type: Function,
    },
  },
  data() {
    const { rowComponents, ...tableConfigs } = getTableConfig(this.name);

    return {
      tableName: this.name,
      loading: false,
      rowComponentsHash: {
        default: 'DefaultCell',
        ...rowComponents,
      },
      selectedItem: null,
      ...tableConfigs,
    };
  },
  mounted() {
    this.getAllItemsLength().then(() => {
      if (!this.allItemsLoaded) {
        this.loadItems();
      }
    });
  },
  computed: {
    allColumns() {
      return this.allTableColumns
        .map(({ name, title }) => ({
          name,
          title,
        }))
        .sort((first, second) => (first.title < second.title ? -1 : 1));
    },
    columnsVisibilityData() {
      return this.allColumns.filter(column => column.name !== 'additional').map(column => ({
        ...column,
        visible: !!this.columns.find(c => c.name === column.name),
      }));
    },
    rows() {
      return this.$store.state.storage[this.rowsGetter].map(item => ({
        ...item,
        height: '50px',
      }));
    },
    filteredItemsLength() {
      return this.$store.state.storage[this.itemsLengthGetter];
    },
    allItemsLoaded() {
      return this.$store.getters[this.allItemsLoadedGetter];
    },
    startDate() {
      return this.$store.getters[this.startDateGetter];
    },
    endDate() {
      return this.$store.getters[this.endDateGetter];
    },
  },
  methods: {
    checkAndLoadItems() {
      if (!this.allItemsLoaded) {
        this.loadItems();
      }
    },
    loadItems() {
      this.loading = true;
      return this.$store.dispatch(this.loadItemsAction).then(() => {
        this.loading = false;
      });
    },
    getAllItemsLength() {
      return this.$store.dispatch(this.loadItemsLengthAction);
    },
    selectItemById(id) {
      const item = this.rows.find(row => row.id === id);
      this.selectedItem = item;
    },
    handleClick(id) {
      this.selectItemById(id);
      // eslint-disable-next-line no-unused-expressions
      this.handleCellClick && this.handleCellClick(id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.configurable-lazy-load-table {
  @include table-base-container;
}

.configurable-lazy-load-table-toolbar {
  @include table-base-toolbar;
}

.configurable-lazy-load-table-title {
  @include table-base-title;
}

.configurable-lazy-load-table-footer {
  @include table-base-footer;
}
</style>

<style lang="scss">
.wombat-table .column-id {
  padding-left: 20px;
}
</style>
