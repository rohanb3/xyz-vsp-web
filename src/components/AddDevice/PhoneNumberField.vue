<template>
  <v-text-field
    v-model="phoneNumber"
    v-mask="mask"
    class="input"
    required
    :disabled="disabled"
    :clearable="!disabled"
    :label="$t('phone.number')"
    :rules="phoneNumberRules"
  />
</template>

<script>
import { mask } from 'vue-the-mask';
import { validatePhoneField } from '@/services/validators';

export default {
  name: 'PhoneNumberField',
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
  directives: {
    mask,
  },
  data: () => ({
    mask: '+1 (###) ###-####',
    phoneNumberRules: [validatePhoneField()],
  }),
  computed: {
    phoneNumber: {
      get() {
        return this.value.phone;
      },
      set(phone) {
        this.$emit('input', { ...this.value, phone });
      },
    },
  },
};
</script>
