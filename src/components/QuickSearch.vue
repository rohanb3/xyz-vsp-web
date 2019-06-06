<template>
  <div class="quick-search">
    <v-autocomplete
      content-class="quick-search-select-list"
      v-model="model"
      :items="items"
      persistent-hint
      :item-value="itemKey"
      :item-text="name"
      :loading="loadingItems"
      ref="dd"
      @update:searchInput="debounceInput"
    ></v-autocomplete>
  </div>
</template>

<script>
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import PerfectScrollbar from 'perfect-scrollbar';
import debounce from 'lodash.debounce';

const SEARCH_TIMEOUT = 500;

function debounceInput(value) {
  this.textValue = value;
  console.log(value);
  
  this.$emit('input', value.trim());
}

export default {
  name: 'QuickSearch',
  components: {
    PerfectScrollbar,
  },
  mixins: [tableToolbarBalloon],
  props: {
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
    initialPhrase: {
      default: '',
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
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
      required: true,
    },
    notFoundMessage: {
      type: String,
      default: 'table.no.results.found',
    },
  },
  data() {
    return {
      textValue: '',
      model: null,
    };
  },
  mounted() {
    this.updateScrollBar();
    if (this.initialPhrase) {
      this.textValue = this.initialPhrase;
    }
  },
  computed: {
    isItemNotFound() {
      return !this.items.length;
    },
  },
  methods: {
    debounceInput: debounce(debounceInput, SEARCH_TIMEOUT),
    onClickItem(item) {
      console.log('=>', item);
    },
    updateScrollBar() {
      this.$nextTick(() => {
        if (this.scrollbar) {
          this.$refs.dd.onScroll();
          this.scrollbar.update();
        } else {
          const el = document.querySelector('.v-select-list');
          this.scrollbar = new PerfectScrollbar(el);
          el.addEventListener('ps-y-reach-end', () => {
            if (!this.loadingItems) {
              this.$emit('loadMoreItems', this.textValue);
            }
          });
        }
      });
    },
  },
  watch: {
    items() {
      this.updateScrollBar();
    },
  },
};
</script>

<style lang="scss">
.quick-search-select-list {
  .v-select-list {
    position: relative;
    height: 200px;

    .v-list__tile__title {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 240px;
    }
  }
}
</style>
