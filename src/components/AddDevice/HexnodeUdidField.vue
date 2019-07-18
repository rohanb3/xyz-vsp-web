<template>
  <v-text-field
    v-model="hexnodeUdid"
    class="input"
    required
    :disabled="disabled"
    :clearable="!disabled"
    :label="$t('udid')"
    :rules="hexnodeUdidRules"
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'HexnodeUdidField',
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
      hexnodeUdidRules: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    hexnodeUdid: {
      get() {
        return this.value.hexnodeUdid;
      },
      set(hexnodeUdid) {
        this.$emit('input', { ...this.value, hexnodeUdid });
      },
    },
  },
};
</script>
