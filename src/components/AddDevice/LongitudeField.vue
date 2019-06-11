<template>
  <v-text-field
    class="input"
    :label="$t('longitude')"
    v-model="longitude"
    :rules="longitudeRules"
    required
    clearable
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty, validateOnlyDigitsAndDots } from '@/services/validators';

export default {
  name: 'LongitudeField',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      longitudeRules: [validateFieldCantBeEmpty(), validateOnlyDigitsAndDots()],
    };
  },
  computed: {
    longitude: {
      get() {
        return this.value.longitude;
      },
      set(longitude) {
        this.$emit('input', { ...this.value, longitude });
      },
    },
  },
};
</script>
