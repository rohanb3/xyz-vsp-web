<template>
  <div class='device-comments-cell'>
    <v-btn
      v-if="!item.isPending"
      icon
      small
      class="comments-button"
      @click.prevent.stop="$emit('deviceIdSelected', item.id, 'comments')"
    >
      <v-icon class="comments-icon">comment</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DeviceCommentsCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.comments-button {
  color: $base-blue;
}
</style>
