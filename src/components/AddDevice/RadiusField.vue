<template>
  <v-text-field
    class="input"
    :label="$t('radius')"
    v-model="radius"
    :rules="radiusRules"
    required
    clearable
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty, validateOnlyDigits } from '@/services/validators';

export default {
  name: 'RadiusField',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      radiusRules: [validateFieldCantBeEmpty(), validateOnlyDigits()],
    };
  },
  computed: {
    radius: {
      get() {
        return this.value.radius;
      },
      set(radius) {
        this.$emit('input', { ...this.value, radius });
      },
    },
  },
};
</script>
