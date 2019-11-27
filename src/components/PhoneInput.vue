<template>
  <div class="phone-input">
    <slot name="label"></slot>
    <vue-tel-input
      v-model="phoneNumber"
      v-bind="bindProps"
      :validCharactersOnly="true"
      @blur="validate"
    />
    <span class="error--text" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'PhoneInput',
  props: {
    value: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default() {
        return '';
      },
    },
  },
  components: { VueTelInput },
  data: () => ({
    mask: '+# (###) ###-####',
    bindProps: {
      mode: 'international',
      defaultCountry: 'US',
      enabledFlags: false,
      onlyCountries: ['US'],
    },
    error: null,
  }),
  computed: {
    phoneNumber: {
      get() {
        return this.value.phone || '';
      },
      set(phone) {
        this.error = null;
        this.$emit('input', { ...this.value, phone });
      },
    },
  },
  methods: {
    validate() {
      const validation = validateFieldCantBeEmpty()(this.phoneNumber);
      const isValid = validation !== true;
      if (isValid) {
        this.error = validation;
      }
      return isValid;
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
  input {
    border: 1px solid $form-input-border-color;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    display: block;
    margin-bottom: 0;
    padding: 11px;
    width: 100%;
  }

  .vue-tel-input {
    border: none;

    .vti__dropdown {
      display: none;
    }
  }
  span {
    font-size: 12px;
  }
}
</style>
