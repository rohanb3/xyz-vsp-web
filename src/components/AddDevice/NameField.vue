<template>
  <v-text-field
    v-model="deviceName"
    class="input"
    required
    :disabled="disabled"
    :clearable="!disabled"
    :label="$t('name')"
    :rules="deviceNameRules"
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'NameField',
  props: {
    value: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deviceNameRules: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    deviceName: {
      get() {
        return this.value.deviceName;
      },
      set(deviceName) {
        this.$emit('input', { ...this.value, deviceName });
      },
    },
  },
};
</script>
