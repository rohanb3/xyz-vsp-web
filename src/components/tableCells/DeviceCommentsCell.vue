<template>
  <div class='device-comments-cell'>
    <v-btn
      icon
      small
      class="comments-button"
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
  computed: {
    status() {
      return this.item.isOnline ? 'Online' : 'Offline';
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
