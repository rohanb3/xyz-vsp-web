<template>
  <div class="quick-search">
    <v-autocomplete
      :content-class="`quick-search-select-list select-list-${this.name}`"
      v-model="model"
      :items="items"
      :disabled="disabled"
      persistent-hint
      :item-value="itemKey"
      :item-text="name"
      :loading="loadingItems"
      ref="quickSearch"
      :no-data-text="notFoundMessage"
      @update:searchInput="debounceInput"
      @input="selectItem"
      @focus="showList = true"
      @blur="showList = false"
    ></v-autocomplete>
  </div>
</template>

<script>
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import PerfectScrollbar from 'perfect-scrollbar';
import debounce from 'lodash.debounce';

const SEARCH_TIMEOUT = 500;

function debounceInput(value) {
  this.textValue = value;
}

export default {
  name: 'QuickSearch',
  components: {
    PerfectScrollbar,
  },
  mixins: [tableToolbarBalloon],
  props: {
    disabled: {
      type: Boolean,
      default: false,
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
    loadingItems: {
      type: Boolean,
      default: false,
    },
    notFoundMessage: {
      type: String,
      default: 'table.no.results.found',
    },
    initialItem: {
      type: Number,
    },
  },
  data() {
    return {
      textValue: '',
      model: null,
      showList: false,
    };
  },
  computed: {
    initialItem: {
      get() {
        return this.initialItem;
      },
      set(itemId) {},
    },
  },
  mounted() {
    this.updateScrollBar();
  },
  methods: {
    debounceInput: debounce(debounceInput, SEARCH_TIMEOUT),
    selectItem(item) {
      this.$emit('select', item);
    },
    updateScrollBar() {
      this.$nextTick(() => {
        if (this.scrollbar) {
          this.$refs.quickSearch.onScroll();
          this.scrollbar.update();
        } else {
          const el = document.querySelector(
            `.select-list-${this.name} .v-select-list`
          );
          this.scrollbar = new PerfectScrollbar(el);
          el.addEventListener('ps-y-reach-end', () => {
            if (!this.loadingItems && this.showList) {
              this.$emit('loadMoreItems', this.textValue);
            }
          });
        }
      });
    },
  },
  watch: {
    items: {
      handler() {
        this.updateScrollBar();
      },
      deep: true,
    },
    textValue(newVal, oldVal) {
      if (newVal === '') this.model = null;
      this.$emit('load', (newVal || '').trim());
    },
  },
};
</script>

<style lang="scss">
.quick-search-select-list {
  .v-select-list {
    position: relative;
    max-height: 25vh;

    .v-list__tile__title {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 240px;
    }
  }
}
</style>
