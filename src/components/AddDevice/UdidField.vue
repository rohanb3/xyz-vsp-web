<template>
  <v-text-field
    v-model="udid"
    class="input"
    required
    :disabled="disabled"
    :clearable="!disabled"
    :label="$t('idfv')"
    :rules="udidRules"
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'UdidField',
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
      udidRules: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    udid: {
      get() {
        return this.value.udid;
      },
      set(udid) {
        this.$emit('input', { ...this.value, udid });
      },
    },
  },
};
</script>
