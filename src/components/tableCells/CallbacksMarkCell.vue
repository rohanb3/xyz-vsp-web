<template>
  <v-tooltip top>
  <template v-slot:activator="{ on }">
    <v-icon 
      v-if="isCallback"
      v-on="on"
      class="icon-callback" 
      color="gray">
      $vuetify.icons.callback
    </v-icon>
  </template>
  <span>{{ $t('callback.tooltip') }}</span>
</v-tooltip>
</template>
<script>
export default {
  name: 'CallbacksMarkCell',
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
  },
  computed: {
    callbacks() {
      return this.item[this.column.field];
    },
    isCallback() {
      return this.callbacks && this.callbacks.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-callback {
  cursor: pointer;
  width: 14px;
  height: 16px;
  margin-left: 8px;
}
</style>
