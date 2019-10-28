<template>
  <div class="phone-input">
    <label for="phoneNumber">{{ $t('phone.number') }}</label>
    <v-text-field
      id="phoneNumber"
      required
      v-model="phoneNumber"
      v-mask="mask"
      :disabled="disabled"
      :clearable="!disabled"
      :rules="phoneNumberRules"
    />
  </div>
</template>

<script>
import phoneInput from '../mixins/phoneInput';

export default {
  name: 'PhoneInput',
  props: {
    field: {
      type: String,
      default() {
        return 'phone';
      },
    },
  },
  mixins: [phoneInput],
  computed: {
    phoneNumber: {
      get() {
        return this.value.phone || '';
      },
      set(phone) {
        this.$emit('change', { value: phone, field: this.field });
      },
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

.phone-input {
  label {
    color: $base-text-color;
    font-size: 10px;
    margin-bottom: 5px;
    opacity: 0.7;
  }
  .v-input {
    padding: 0;

    .v-input__slot {
      border: 1px solid $form-input-border-color;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      margin-bottom: 0;
      padding: 5px 0 5px 10px;

      &::before {
        border: none !important;
      }
    }
  }
}
</style>
