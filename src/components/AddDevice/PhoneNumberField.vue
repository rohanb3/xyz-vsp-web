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
import phoneInput from '../../mixins/phoneInput';

export default {
  name: 'PhoneNumberField',
  mixins: [phoneInput],
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
