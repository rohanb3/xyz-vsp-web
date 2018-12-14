<template>
  <div
    class='status-cell'
    :class="`status-${item.status}`"
  >
    <v-icon class="status-icon">
      {{ isFailed ? 'thumb_down' : 'thumb_up' }}
    </v-icon>
    <span class="status-label">{{ status }}</span>
  </div>
</template>

<script>
export default {
  name: 'RatingCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    status() {
      return this.item.status ? this.$t(this.item.status) : '-';
    },
    isFailed() {
      return this.item.status === 'fail';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.status-cell {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  font-size: 12px;
  color: $table-inactive-color;
  opacity: 0.56;

  .status-icon {
    margin-right: 5px;
    transform: scale(0.7);
  }
}

.status-cell.status-success {
  opacity: 1;
  color: $calls-status-success-color;

  .status-icon {
    color: $calls-status-success-icon-color;
    opacity: 0.7;
  }
}

.status-cell.status-fail {
  opacity: 1;
  color: $calls-status-fail-color;

  .status-icon {
    color: $calls-status-fail-icon-color;
  }
}
</style>
