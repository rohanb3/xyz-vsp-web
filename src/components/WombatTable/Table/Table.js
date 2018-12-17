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
    reorder: {
      type: Boolean,
      default: true,
    },
    infiniteLoading: {
      type: Boolean,
      default: false,
    },
    scrollOnItemsInsert: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rowWidth: '100%',
      lastScrollTop: 0,
      lastScrollHeight: 0,
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
    itemsLength() {
      return this.items.length;
    },
  },
  methods: {
    onGlobalResize() {
      this.checkHeaderWidth();
    },
    checkHeaderWidth() {
      this.rowWidth = this.$refs.scroller.$el.clientWidth;
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
    scrollToFirstUpdatedItem() {
      const scrollTop = this.lastScrollTop + this.lastScrollHeight - this.itemHeight;
      this.$refs.scroller.setScrollTop(scrollTop);
    },
    infiniteHandler() {
      this.$emit('bottomReached');
      const { scrollTop, clientHeight } = this.$refs.scroller.$el;
      this.lastScrollTop = scrollTop;
      this.lastScrollHeight = clientHeight;
    },
  },
  watch: {
    itemsLength(next, old) {
      const itemsInserted = next > old;
      if (itemsInserted && this.scrollOnItemsInsert) {
        this.$nextTick(this.scrollToFirstUpdatedItem);
      }
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
