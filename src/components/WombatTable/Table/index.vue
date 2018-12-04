<template>
  <div class="wombat-table">

    <wombat-header
      :columns="columns"
      :width="rowWidth"
      :resize ="resize"
      @columnsResized="data => $emit('columnsResized', data)"
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
      :size="40"
      :remain="20"
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
        v-if="infiniteLoading"
        class="infinite-loader"
        force-use-infinite-wrapper=".virtual-list"
        @infinite="infiniteHandler"
      ></infinite-loading>
    </virtual-list>
    <slot name="footer">
      <wombat-footer
        v-if="footerCellStotPresent"
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
      <!-- <recycle-scroller
        ref="scroller"
        class="scroller"
        :items="items"
        :item-height="32"
        :buffer="10"
      >
        <div
          slot-scope="row"
          class="row"
        >
          <slot
            name="row"
            :columns="columns"
            :item="row.item"
            :height="itemHeight"
          >

            <wombat-row
              :item="row.item"
              :columns="columns"
              :height="itemHeight"
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
      </recycle-scroller> -->
  </div>
</template>

<script src="./Table.js">
</script>

<style scoped lang="scss" src="./Table.scss">
</style>

<style lang="scss" src="./Table.unscoped.scss">
</style>
