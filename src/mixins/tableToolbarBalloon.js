import Popper from 'vue-popperjs';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

export default {
  name: 'TableDatesEditor',
  components: {
    Popper,
  },
  props: {
    boundariesSelector: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isShown: false,
      keymap: {
        esc: this.checkAndHide,
      },
    };
  },
  computed: {
    options() {
      return {
        modifiers: {
          preventOverflow: { boundariesElement: 'scrollParent' },
          placement: 'bottom',
        },
      };
    },
  },
  mounted() {
    if (this.$refs.popper2) {
      this.scrollBbr = new PerfectScrollbar(this.$refs.popper2);
    }
  },
  methods: {
    checkAndShow() {
      if (!this.isShown) {
        this.$nextTick(this.show);
      }
    },
    checkAndHide() {
      if (this.isShown) {
        this.$nextTick(this.hide);
      }
    },
    show() {
      this.$refs.popper.doShow();
    },
    hide() {
      this.$refs.popper.doClose();
    },
    onShow() {
      this.isShown = true;
    },
    onHide() {
      this.isShown = false;
    },
  },
};
