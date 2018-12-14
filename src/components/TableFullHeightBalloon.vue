<template>
  <div
    v-hotkey="keymap"
    class="table-full-height-balloon"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TableFullHeightBalloon',
  data() {
    return {
      keymap: {
        esc: this.close,
      },
    };
  },
  mounted() {
    this.subscribeToClickOut();
  },
  beforeDestroy() {
    this.unsubscribeFromClickOut();
  },
  methods: {
    subscribeToClickOut() {
      document.addEventListener('click', this.onClick);
    },
    unsubscribeFromClickOut() {
      document.removeEventListener('click', this.onClick);
    },
    onClick(ev) {
      if (!ev.target.closest('.table-full-height-balloon')) {
        this.close();
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.table-full-height-balloon {
  position: absolute;
  top: $header-height;
  right: 0;
  bottom: 0;
}
</style>
