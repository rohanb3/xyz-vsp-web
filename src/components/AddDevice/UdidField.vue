<template>
  <v-text-field
    class="input"
    :label="$t('udid')"
    v-model="udid"
    :rules="udidRules"
    required
    clearable
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
