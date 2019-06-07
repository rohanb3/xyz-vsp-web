<template>
  <div class="wombat-table" :class="[name]">
    <wombat-header
      :name="name"
      :columns="columns"
      :width="rowWidth"
      :resize="resize"
      :columnsReorder="columnsReorder"
      @columnsResized="data => $emit('columnsResized', data)"
      @columnsReordered="data => $emit('columnsReordered', data)"
    >
      <div
        :slot="headerCellStotPresent ? 'header-cell' : 'header-cell-disabled'"
        slot-scope="headerCell"
        class="header-cell"
      >
        <slot name="header-cell" :column="headerCell.column" />
      </div>
    </wombat-header>
    <RecycleScroller
      v-show="scrollbarShown"
      class="scroller virtual-list ps"
      ref="scroller"
      :items="items"
      :item-size="50"
      :key-field="itemKeyName"
    >
      <slot
        slot-scope="row"
        class="row"
        name="row"
        :columns="columns"
        :item="row.item"
        :height="itemHeight"
      >
        <wombat-row :item="row.item" :columns="columns" :height="itemHeight">
          <div
            :slot="rowCellStotPresent ? 'row-cell' : 'row-cell-disabled'"
            slot-scope="rowCell"
            class="row-cell"
          >
            <slot name="row-cell" :column="rowCell.column" :item="rowCell.item" />
          </div>
        </wombat-row>
      </slot>
      <div slot="after">
        <infinite-loading
          v-if="infiniteLoading && items.length"
          class="infinite-loader"
          force-use-infinite-wrapper=".virtual-list"
          :distance="0"
          @infinite="infiniteHandler"
        />

        <div key="tableLoader">
          <slot name="loader"></slot>
        </div>
      </div>
    </RecycleScroller>
    <div v-show="!scrollbarShown" class="no-result-found">{{ $t('table.no.results.found') }}</div>
    <slot name="footer">
      <wombat-footer v-if="footerCellStotPresent" class="wombat-footer" :width="rowWidth">
        <div
          :slot="footerCellStotPresent ? 'footer-cell' : 'footer-cell-disabled'"
          slot-scope="footerCell"
          class="footer-cell"
        >
          <slot name="footer-cell" :column="footerCell.column" />
        </div>
      </wombat-footer>
    </slot>
  </div>
</template>

<script src="./Table.js">
</script>

<style scoped lang="scss" src="./Table.scss">
</style>

<style lang="scss" src="./Table.unscoped.scss">
</style>
