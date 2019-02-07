<template>
  <div class="status-switcher-container">
    <v-switch class="online-switcher" :label="label" v-model="isOnline" color="#1657a8"/>
  </div>
</template>

<script>
export default {
  name: 'OnlineStatusSwitcher',
  data() {
    return {
      isOnline: false,
    };
  },
  computed: {
    label() {
      return this.isOnline ? 'Online' : 'Offline';
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';
.status-switcher-container {
  .theme--light.v-input--switch__thumb {
    color: #fafafa !important;
  }
  .v-input--switch__track {
    height: 16px;
  }
  .v-input--is-label-active {
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