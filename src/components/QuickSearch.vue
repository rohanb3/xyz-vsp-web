<template>
  <v-text-field
    class="mx-3 quick-search"
    v-model.trim="textValue"
    :label="label"
    :placeholder="placeholder"
    @input="debounceInput"
  ></v-text-field>
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
    label: {
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

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
</style>
