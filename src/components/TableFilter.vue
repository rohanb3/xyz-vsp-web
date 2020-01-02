<template>
  <div class="table-filter" @click="showFilter">
    <div class="table-filter-editor" ref="tableFilter" :style="{ minWidth: minWidthFilterEditor }">
      {{ title }}{{ selectedItemsForTitle }}
    </div>
    <popper
      trigger="click"
      ref="popper"
      :options="options"
      :boundaries-selector="boundariesSelector"
      @show="onShow"
      @hide="hideFilter"
    >
      <div class="popper">
        <div v-if="useQuickBtn" class="table-filter-btn">
          <a href="#" @click.prevent="onSelectAllItemDisplayed">{{
            $t('table.filter.select.all')
          }}</a>
          <a href="#" @click.prevent="onClearAllItemDisplayed">{{
            $t('table.filter.clear.all')
          }}</a>
        </div>
        <template v-if="useSearchField">
          <input
            v-model.trim="searchField"
            type="text"
            class="search-field"
            :placeholder="$t('table.filter.placeholder.search')"
            @input="debounceInput"
            @focus="searchFocus = true"
          />
          <v-icon
            v-show="searchField.length > 0"
            class="search-field-cancel"
            v-text="'$vuetify.icons.cancel'"
            @click="reset"
          ></v-icon>
        </template>
        <VuePerfectScrollbar class="scroll-area ps">
          <ul class="list-selector">
            <li
              :class="{ selected: item.selected }"
              v-for="item in optionList"
              :key="item[itemKey]"
              @click.stop="onClickItem(item)"
            >
              {{ item[name] }}
            </li>
            <slot name="loader"></slot>
          </ul>
        </VuePerfectScrollbar>
      </div>
      <div slot="reference" class="datepicker-toggler">
        <div class="caret"></div>
      </div>
    </popper>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import { getStringFromValuesByKey } from '@/services/utils';

const SEARCH_TIMEOUT = 500;
const DISPLAYED_ITEMS_IN_TITLE = 3;

export default {
  name: 'TableFilter',
  mixins: [tableToolbarBalloon],
  components: {
    VuePerfectScrollbar,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    name: {
      type: String,
      default: 'name',
    },
    listSize: {
      type: Number,
      default: 7,
    },
    useQuickBtn: {
      type: Boolean,
      default: true,
    },
    useSearchField: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchField: '',
      searchFocus: false,
      minWidthFilterEditor: 'auto',
    };
  },
  computed: {
    optionList() {
      if (this.searchField.length) return this.searchinOptions;
      return this.itemDisplayed;
    },
    itemDisplayed() {
      const listSize = this.listSize - this.listSizeSelectedItems;
      const shortListUnselectedItems = this.unselectedItems.slice(0, listSize > 0 ? listSize : 0);
      return this.selectedItems.concat(shortListUnselectedItems).sort(this.sortItems);
    },
    selectedItems() {
      return this.items.filter(item => item.selected === true);
    },
    unselectedItems() {
      return this.items.filter(item => item.selected !== true);
    },
    listSizeSelectedItems() {
      return this.selectedItems.length;
    },
    selectedItemsForTitle() {
      return getStringFromValuesByKey(this.name, this.selectedItems, DISPLAYED_ITEMS_IN_TITLE);
    },
    searchinOptions() {
      return (this.exactMatchSearch() || this.occurrenceSearch() || []).slice(0, this.listSize);
    },
  },
  methods: {
    search() {
      if (this.searchField.length > 0 && this.searchinOptions.length === 0) {
        this.$emit('notFound', {
          itemKey: this.itemKey,
          searchField: this.searchField,
        });
      }
    },
    exactMatchSearch() {
      const result = this.items.filter(option =>
        this.compareStr(option[this.name], this.searchField)
      );
      return result.length > 0 ? result : 0;
    },
    occurrenceSearch() {
      const result = this.items.filter(
        option => option[this.name].toLowerCase().indexOf(this.searchField.toLowerCase()) >= 0
      );
      return result.length > 0 ? result : 0;
    },
    compareStr(word, searchWord) {
      return word.toLowerCase().substring(0, searchWord.length) === searchWord.toLowerCase();
    },
    onClickItem(item) {
      this.$emit('select', {
        itemKeyName: this.itemKey,
        itemKeyVal: item[this.itemKey],
      });
    },
    onSelectAllItemDisplayed() {
      if (this.searchField.length) {
        this.$emit('selectAll', {
          itemKeyName: this.itemKey,
          items: this.searchinOptions,
        });
      } else {
        this.$emit('selectAll', {
          itemKeyName: this.itemKey,
          items: this.itemDisplayed,
        });
      }
      this.reset();
    },
    onClearAllItemDisplayed() {
      this.$emit('clearAll', {
        itemKeyName: this.itemKey,
        items: this.itemDisplayed,
      });
      this.reset();
    },
    reset() {
      this.searchFocus = false;
      this.searchField = '';
    }, // eslint-disable-next-line func-names
    debounceInput: debounce(function() {
      this.search();
    }, SEARCH_TIMEOUT),
    showFilter() {
      this.minWidthFilterEditor = `${this.$refs.tableFilter.offsetWidth}px`;
      this.checkAndShow();
    },
    hideFilter() {
      this.minWidthFilterEditor = 'auto';
      this.onHide();
    },
    sortItems(currentItem, nextItem) {
      if (currentItem[this.name] > nextItem[this.name]) {
        return 1;
      }
      if (currentItem[this.name] < nextItem[this.name]) {
        return -1;
      }
      return 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
/*@import '~@/assets/styles/popper.scss';*/

.table-filter {
  height: 20px;
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  border: 1px solid $table-toolbar-section-border-color;
  font-size: 12px;
  color: $table-toolbar-section-color;
  font-weight: 500;
}
.table-filter-editor {
  overflow: hidden;
  max-width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.table-filter-btn {
  display: flex;
  margin-top: 7px;
  a {
    text-decoration: none;
    font-size: 12px;
    margin-left: 15px;
  }
}
.popper {
  display: flex;
  flex-flow: column nowrap;
}
.selected {
  color: $base-blue;
}
.list-selector {
  cursor: pointer;
  user-select: none;
  min-height: 30px;
  line-height: 28px;
  font-size: 14px;
  color: $base-text-color;
  text-align: left;
  padding: 7px 15px;
  margin-left: 7px;
  max-height: 50vh;
  .scroll-area {
    overflow-y: auto;
  }
}
.selected::before {
  content: '\2714';
  display: inline-block;
  color: $base-blue;
  position: absolute;
  margin-left: -12px;
}
.caret {
  border: 1px solid $base-blue;
  width: 7px;
  height: 7px;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  margin: -4px 0 0 5px;
}
.search-field {
  outline: none;
  border-bottom: 1px solid $table-filter-search-field-border-bottom;
  margin-top: 7px;
  padding: 0 24px 4px 15px;
  &::placeholder {
    font-size: 14px;
    color: $table-filter-search-field-placeholder;
  }
}
.search-field-cancel {
  position: absolute;
  font-size: 20px;
  top: 32px;
  right: 4px;
}
</style>
