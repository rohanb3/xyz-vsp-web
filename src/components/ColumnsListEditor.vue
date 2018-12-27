<template>
  <div
    v-hotkey="keymap"
    class="columns-list-editor"
    @click="checkAndShow"
  >
    <img
      alt="Columns list editor"
      class="columns-list-icon"
      :src="icon">
    <popper
      trigger="click"
      ref="popper"
      :options="options"
      :boundaries-selector="boundariesSelector"
      @show="onShow"
      @hide="onHide"
    >
      <div class="popper">
        <checkbox-list
          class="columns-list"
          :items="columns"
          @change="data => $emit('visibilityChanged', data)"
        />
        <div
          class="revert-to-default"
          @click="revertToDefault">
          {{ $t('revert.to.default') }}
        </div>
      </div>

      <div
        slot="reference"
        class="columns-list-toggler"
      >
        <div
          class="caret"
          :class="{ opened: isShown }"
        ></div>
      </div>
    </popper>
  </div>
</template>

<script>
import CheckboxList from '@/components/CheckboxList';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import icon from '@/assets/icons/group.svg';

export default {
  components: {
    CheckboxList,
  },
  mixins: [tableToolbarBalloon],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      icon,
    };
  },
  methods: {
    revertToDefault() {
      this.$emit('revertToDefault');
      this.$refs.popper.doClose();
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.columns-list-editor {
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor: pointer;
}

.columns-list {
  width: 200px;
  padding: 0 10px;
}

.columns-list-icon {
  margin-right: 5px;
  cursor: pointer;
}

.columns-list-toggler {
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor: pointer;
}

.caret {
  border-top: 3px solid $table-header-icon-color;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  transition: transform 0.3s;

  &.opened {
    transform: rotateX(-180deg);
  }
}

.revert-to-default {
  margin: 10px 0;
  color: $popper-chechkbox-color;
  cursor: pointer;
}
</style>
