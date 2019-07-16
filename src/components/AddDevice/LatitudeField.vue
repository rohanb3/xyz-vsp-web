<template>
  <v-text-field
    class="input"
    :label="$t('latitude')"
    v-model="latitude"
    :rules="latitudeRules"
    required
    clearable
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty, validateOnlyDigitsAndDotsAndDash } from '@/services/validators';

export default {
  name: 'LatitudeField',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      latitudeRules: [validateFieldCantBeEmpty(), validateOnlyDigitsAndDotsAndDash()],
    };
  },
  computed: {
    latitude: {
      get() {
        return this.value.latitude;
      },
      set(latitude) {
        this.$emit('input', { ...this.value, latitude });
      },
    },
  },
};
</script>
