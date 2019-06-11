<template>
  <div class="comment-tab">
    <comment-area v-model="comment" @onInput="onInput" @submit="submit" />
    <wombat-table
      :name="tableName"
      :items="rows"
      :columns="columns"
      :item-height="50"
      :loading-items="loading"
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
      >
        <div v-if="row && row.length" slot="row" slot-scope="row">
          <wombat-row
            :item="row.item"
            :columns="row.columns"
            :height="row.item.height"
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
          <table-loader v-if="loading" slot="loader" />
        </div>
      </component>
    </wombat-table>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';
import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';

import { submitComment } from '@/services/devicesRepository';
import { ENTITY_TYPES } from '@/constants';
import CommentArea from './CommentArea';

const { DEVICE_COMMENTS } = ENTITY_TYPES;

export default {
  name: 'DeviceCommentTab',
  components: { CommentArea, TableLoader, WombatTable, WombatRow, DefaultHeaderCell },
  props: {
    selectedDeviceId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableName: DEVICE_COMMENTS,
      loading: false,
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
      },
      rowComponentsHash: {
        default: 'DefaultCell',
      },
      comment: '',
    };
  },
  mixins: [configurableColumnsTable, lazyLoadTable],
  methods: {
    onInput(comment) {
      this.comment = comment;
    },
    async submit() {
      try {
        await submitComment(this.selectedDeviceId, this.comment);
        this.comment = '';
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
