<template>
  <div class='additional-cell'>
    <v-btn
      icon
      small
    >
      <v-icon class="cell-icon">more_horiz</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AdditionalCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.additional-cell {
  .cell-icon {
    color: $customers-table-additional-cell-color;
  }
}
</style>
