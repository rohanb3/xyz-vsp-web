<template>
  <div class="status-switcher-container">
    <v-switch
      class="online-switcher"
      color="#1657a8"
      :label="label"
      :input-value="isOnline"
      @change="onStatusChanged"
    />
  </div>
</template>

<script>
export default {
  name: 'OnlineStatusSwitcher',
  props: {
    isOnline: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    label() {
      return this.isOnline ? 'Online' : 'Offline';
    },
  },
  methods: {
    onStatusChanged() {
      this.$emit('statusChanged');
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';
.status-switcher-container {
  .v-input--switch__thumb {
    color: $base-red !important;
  }
  .v-input--switch__track {
    height: 16px;
  }
  .v-input--is-label-active {
    .v-input--switch__thumb {
      color: $base-white !important;
    }
    .v-input--switch__thumb {
      transform: translate(41px);
    }
    .v-label {
      left: -54px !important;
    }
  }

  .v-label {
    font-size: 9px;
    color: $base-white;
    left: -38px !important;
    top: 1px !important;
  }

  .v-input--switch .v-input--selection-controls__input .v-input--switch__track,
  .v-input--switch .v-input--selection-controls__input,
  .v-input--selection-controls__ripple {
    width: 55px !important;
  }
}
</style>

<style lang="scss" scoped>
.status-switcher-container {
  position: relative;
  height: 35px;
  width: 60px;
}
</style>
