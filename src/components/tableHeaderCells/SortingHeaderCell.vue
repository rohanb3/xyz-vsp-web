<template>
  <div class="sorting-header-cell" @click="onClickSortingHeaderCell">
    <span class="sorting-header-title">{{ $t(column.title) }}</span>
    <v-icon v-show="arrowDirection === true" class="sorting-header-icon" small
      >fas arrow_downward</v-icon
    >
    <v-icon v-show="arrowDirection === false" class="sorting-header-icon" small
      >arrow_upward</v-icon
    >

    <v-icon v-show="arrowDirection === null" class="sorting-header-icon clear-sorting down" small
      >fas arrow_downward</v-icon
    >
    <v-icon v-show="arrowDirection === null" class="sorting-header-icon clear-sorting up" small
      >arrow_upward</v-icon
    >
  </div>
</template>

<script>
import { SORTING_DIRECTION } from '@/constants';

export default {
  name: 'SortingHeaderCell',
  props: {
    column: {
      type: Object,
      required: true,
    },
    sortingField: {
      validator(value) {
        return typeof value === 'string' || value === null;
      },
    },
    sortDirection: {
      required: true,
      validator(value) {
        return [SORTING_DIRECTION.DESC, SORTING_DIRECTION.ASC, null].includes(value);
      },
    },
  },
  computed: {
    arrowDirection() {
      if (this.column.sortingFieldName === this.sortingField) {
        return this.sortDirection === SORTING_DIRECTION.ASC;
      }
      return null;
    },
  },
  methods: {
    onClickSortingHeaderCell() {
      this.$emit('sortDirectionChanged', this.column.sortingFieldName);
    },
  },
};
</script>

<style lang="scss" scoped>
.sorting-header-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  height: 100%;

  .sorting-header-icon {
    position: absolute;
    right: 0;
    margin-right: 5px;
  }

  .clear-sorting {
    font-size: 12px !important;
  }

  .up {
    top: 9px;
    margin-right: 5px;
  }

  .down {
    top: 17px;
    margin-right: 8px;
  }
}

.sorting-header-title {
  margin-right: 16px;
  overflow: hidden;
}
</style>
