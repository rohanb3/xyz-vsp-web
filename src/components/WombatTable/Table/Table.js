import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import InfiniteLoading from 'vue-infinite-loading';
import VirtualList from 'vue-virtual-scroll-list';

import WombatHeader from '../Header';
import WombatRow from '../Row';
import WombatFooter from '../Footer';

export default {
  name: 'wombat-table',
  components: {
    RecycleScroller,
    WombatRow,
    WombatHeader,
    WombatFooter,
    InfiniteLoading,
    PerfectScrollbar,
    VirtualList,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemHeight: {
      default: 35,
    },
    resize: {
      type: Boolean,
      default: true,
    },
    infiniteLoading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      rowWidth: '100%',
    };
  },
  computed: {
    rowCellStotPresent() {
      return !!this.$scopedSlots['row-cell'] || !!this.$slots['row-cell'];
    },
    headerCellStotPresent() {
      return !!this.$scopedSlots['header-cell'] || !!this.$slots['header-cell'];
    },
    footerCellStotPresent() {
      return !!this.$scopedSlots['footer-cell'] || !!this.$slots['footer-cell'];
    },
  },
  methods: {
    onGlobalResize() {
      this.checkHeaderWidth();
    },
    checkHeaderWidth() {
      this.rowWidth = this.$refs.scroller.$el.clientWidth;
    },
    infiniteHandler(state) {
      this.$emit('bottomReached');
      const unwatch = this.$watch('items', () => {
        unwatch();
        state.loaded();
        const prevScrollTop = this.$refs.scroller.$el.scrollTop;
        this.$refs.scroller.setScrollTop(prevScrollTop + 100);
      });
    },
    updateScrollBar() {
      this.$nextTick(() => {
        if (this.scrollbar) {
          this.scrollbar.update();
        } else {
          const el = document.querySelector('.virtual-list');
          this.scrollbar = new PerfectScrollbar(el);
        }
      });
    },
  },
  watch: {
    items() {
      this.updateScrollBar();
    },
  },
  mounted() {
    this.checkHeaderWidth();
    this.updateScrollBar();
    setTimeout(this.checkHeaderWidth, 500); // Fix for IE11 because it's pretty slow.

    window.addEventListener('resize', this.onGlobalResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onGlobalResize);
  },
};
