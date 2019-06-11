<template>
  <confirm-popup
    :visible-popup="visiblePopup"
    :title="$t('leave.add.device')"
    @close="onClose"
  >
    {{ $t('are.you.sure.your.changes.will.not.be.saved') }}
    <template v-slot:buttons>
      <v-btn small depressed class="button button-save" @click="onSure">{{ $t('sure') }}</v-btn>
      <v-btn small depressed class="button button-cancel" @click="onCancel">
        {{ $t('cancel') }}
      </v-btn>
    </template>
  </confirm-popup>
</template>

<script>
import ConfirmPopup from '@/components/ConfirmPopup';

export default {
  name: 'ConfrimLeaveAddDevicePopup',
  props: {
    visiblePopup: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    ConfirmPopup,
  },
  methods: {
    onSure() {
      this.$emit('close');
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.button {
  font-size: 14px;
  text-transform: capitalize;
}

.button-save {
  color: $base-white;
  background-color: $base-green !important;
}

.button-cancel {
  font-size: 14px;
  opacity: 0.5;
  background-color: transparent !important;
  color: $base-text-color;
}
</style>
