import VAutocomplete from 'vuetify/es5/components/VAutocomplete';
import PerfectScrollbar from 'perfect-scrollbar';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const MIN_SCROLLBAR_LENGTH = 20;

export default {
  extends: VAutocomplete,
  components: {
    PerfectScrollbar,
  },
  props: {
    entityName: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.updateScrollBar();
  },
  data() {
    return {
      scrollbar: null,
    };
  },
  methods: {
    updateScrollBar() {
      if (this.scrollbar) {
        this.onScroll();
        this.$nextTick(() => {
          this.scrollbar.update();
        });
      } else {
        const el = document.querySelector(`.select-list-${this.entityName} .v-select-list`);
        this.scrollbar = new PerfectScrollbar(el, {
          minScrollbarLength: MIN_SCROLLBAR_LENGTH,
        });
        el.addEventListener('ps-y-reach-end', () => {
          if (!this.loading && this.isMenuActive) {
            this.$emit('loadMoreItems', this.lazySearch);
          }
        });
      }
    },
  },
  watch: {
    isMenuActive() {
      if (!this.lazySearch) {
        this.$emit('searchInput');
      }
    },
    lazySearch(value) {
      this.scrollbar.scrollTop = 0;
      this.$emit('searchInput', value);
    },
    items() {
      this.updateScrollBar();
    },
  },
};
