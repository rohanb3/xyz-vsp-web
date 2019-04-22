<template>
  <v-dialog
    v-if="isShown"
    :value="isShown"
    v-cssBlurOverlay
    content-class="call-permissions-popup"
    persistent
    width="400px"
  >
    <v-layout column>
      <h4>{{ $t('call.permissions.popup.title') }}</h4>
      <ul class="disabled-permissions-list">
        <li
          v-for="permission in disabledPermissions"
          :key="permission"
          class="disabled-permission"
        >
          {{ $t(`call.permissions.popup.${permission}`) }}
        </li>
      </ul>
    </v-layout>
  </v-dialog>
</template>

<script>
import cssBlurOverlay from '@/directives/cssBlurOverlay';

export default {
  name: 'CallPermissionsPopup',
  directives: {
    cssBlurOverlay,
  },
  computed: {
    permissions() {
      return this.$store.state.call.permissions;
    },
    disabledPermissions() {
      return Object.keys(this.permissions).filter(
        key => !this.permissions[key]
      );
    },
    isShown() {
      return this.disabledPermissions.length;
    },
  },
};
</script>

<style lang="scss">
.call-permissions-popup {
  padding: 20px;

  .disabled-permissions-list {
    margin-top: 20px;
    list-style-type: circle;
    padding-left: 20px;
  }
}
</style>
