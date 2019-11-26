<template>
  <v-text-field
    v-model.trim="textValue"
    class="mx-3 quick-search"
    solo
    prepend-inner-icon="search"
    :placeholder="$t(placeholder) || $t('quick.search')"
    @input="debounceInput"
  />
</template>

<script>
import debounce from 'lodash.debounce';

const SEARCH_TIMEOUT = 500;

function debounceInput(value) {
  this.$emit('input', value.trim());
}

export default {
  name: 'QuickSearch',
  props: {
    placeholder: {
      type: String,
    },
    initialPhrase: {
      default: '',
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
    },
  },
  data() {
    return {
      textValue: '',
    };
  },
  mounted() {
    if (this.initialPhrase) {
      this.textValue = this.initialPhrase;
    }
  },
  methods: {
    debounceInput: debounce(debounceInput, SEARCH_TIMEOUT),
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.quick-search /deep/ {
  .v-input__control {
    min-height: 20px;
    height: 20px;

    .v-input__slot {
      width: 180px;
      box-shadow: none !important;
      margin-bottom: 0;
      padding-left: 4px;
      border: solid 1px $quick-search-border-color;
      border-radius: 3px;
      font-size: 12px;

      input::placeholder {
        opacity: 0.8;
        color: $base-text-color;
      }

      .v-input__icon {
        min-width: 16px;
        width: 16px;
        height: 16px;
      }
    }

    .v-icon.material-icons {
      font-size: 14px;
      opacity: 0.8;
      color: $base-text-color;
    }

    .v-text-field__details {
      display: none;
    }
  }
}
</style>
