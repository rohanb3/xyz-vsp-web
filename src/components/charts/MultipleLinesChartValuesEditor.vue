<template>
  <div v-hotkey="keymap" class="toggle-values-btn" @click="checkAndShow">
    <v-icon color="#398ffb" size="20">more_horiz</v-icon>
    <popper
      trigger="click"
      ref="popper"
      :options="options"
      :boundaries-selector="boundariesSelector"
      @show="onShow"
      @hide="onHide"
    >
      <div class="popper" ref="popper2">
        <checkbox-list
          class="values-list"
          :items="values"
          @change="data => $emit('visibilityChanged', data)"
        />
      </div>

      <div slot="reference"></div>
    </popper>
  </div>
</template>

<script>
import CheckboxList from '@/components/CheckboxList';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';

export default {
  components: {
    CheckboxList,
  },
  mixins: [tableToolbarBalloon],
  props: {
    values: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.toggle-values-btn {
  padding: 0 8px;
  height: 23px;
  border: 1px solid $base-button-border-color;
  border-radius: 3px;
  cursor: pointer;
}

.values-list {
  padding: 0 15px;
}
</style>
