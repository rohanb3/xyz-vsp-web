import Popper from 'vue-popperjs';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const DELAY_BEFORE_OPENING = 10;

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
  methods: {
    checkAndShow() {
      if (!this.isShown) {
        setTimeout(this.show.bind(this), DELAY_BEFORE_OPENING);
      }
    },
    checkAndHide() {
      if (this.isShown) {
        setTimeout(this.hide.bind(this), DELAY_BEFORE_OPENING);
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
