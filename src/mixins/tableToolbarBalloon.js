import Popper from 'vue-popperjs';

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
          offset: {
            offset: '0, 10px',
          },
        },
      };
    },
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
