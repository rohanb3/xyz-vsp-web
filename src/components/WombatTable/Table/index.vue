<template>
  <div class="wombat-table">

    <wombat-header
      :columns="columns"
      :width="rowWidth"
      :resize ="resize"
      :columnsReorder="columnsReorder"
      @columnsResized="data => $emit('columnsResized', data)"
      @columnsReordered="data => $emit('columnsReordered', data)"
      :name="name"
    >
      <div
        :slot="headerCellStotPresent ? 'header-cell' : 'header-cell-disabled'"
        slot-scope="headerCell"
        class="header-cell"
      >
        <slot
          name="header-cell"
          :column="headerCell.column"
        />
      </div>
    </wombat-header>

    <virtual-list
      class="virtual-list"
      ref="scroller"
      :size="itemHeight"
      :remain="50"
      :bench="5"
    >
      <div
        v-for="item of items"
        :key="item.id"
        class="row-wrapper"
      >
        <slot
          name="row"
          :columns="columns"
          :item="item"
          :height="itemHeight"
        >
          <wombat-row
            :columns="columns"
            :height="itemHeight"
            :item="item"
          >
            <div
              :slot="rowCellStotPresent ? 'row-cell' : 'row-cell-disabled'"
              slot-scope="rowCell"
              class="row-cell"
            >
              <slot
                name="row-cell"
                :column="rowCell.column"
                :item="rowCell.item"
              />
            </div>
          </wombat-row>
        </slot>
      </div>

      <infinite-loading
        v-if="infiniteLoading && items.length"
        class="infinite-loader"
        force-use-infinite-wrapper=".virtual-list"
        :distance="0"
        @infinite="infiniteHandler" />

    </virtual-list>

    <slot name="footer">
      <wombat-footer
        v-if="footerCellStotPresent"
        class="wombat-footer"
        :width="rowWidth"
      >
        <div
          :slot="footerCellStotPresent ? 'footer-cell' : 'footer-cell-disabled'"
          slot-scope="footerCell"
          class="footer-cell"
        >
          <slot
            name="footer-cell"
            :column="footerCell.column"
          />
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
