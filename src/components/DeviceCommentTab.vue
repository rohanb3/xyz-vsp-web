<template>
  <div class="comment-tab">
    <comment-area v-model="comment" @onInput="onInput" @submit="submit" />
    <lazy-load-table item-key-name="createOn" :tableName="tableName" :resize="false" :columns-reorder="false">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :role="role"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
      />
    </lazy-load-table>
  </div>
</template>

<script>
import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import DateCell from '@/components/tableCells/DateCell';

import { submitComment } from '@/services/devicesRepository';
import { ENTITY_TYPES } from '@/constants';
import CommentArea from './CommentArea';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import LazyLoadTable from '../containers/LazyLoadTable';

const { DEVICE_COMMENTS } = ENTITY_TYPES;

export default {
  name: 'DeviceCommentTab',
  components: {
    LazyLoadTable,
    CommentArea,
    DefaultHeaderCell,
    DateCell,
  },
  props: {
    deviceId: {
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
        date: 'DateCell',
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
        const comment = { comment: this.comment };
        await submitComment(this.deviceId, comment);
        this.comment = '';

        const data = {
          tableName: DEVICE_COMMENTS,
          filters: [
            {
              name: 'id',
              value: this.deviceId,
            },
          ],
        };
        this.$store.dispatch(APPLY_FILTERS, data);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.comment-tab /deep/ {
  .virtual-list {
    max-height: calc(
      100vh - #{$header-height} - #{$device-info-popup-header-height} - #{$table-header-height} - #{$device-info-popup-padding} -
        #{270px}
    );
  }
}
</style>
