<template>
  <div>
    <v-text-field
      class="mx-3 quick-search"
      v-model.trim="textValue"
      :label="label"
      :placeholder="placeholder"
      @input="debounceInput"
    ></v-text-field>
    <VuePerfectScrollbar class="scroll-area ps">
      <ul class="list-selector">
        <li
          v-for="item in optionList"
          :key="item[itemKey]"
          @click.stop="onClickItem(item)"
        >{{ item[name] }}</li>
        <slot name="loader"></slot>
      </ul>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import debounce from 'lodash.debounce';

const SEARCH_TIMEOUT = 500;

function debounceInput(value) {
  this.$emit('input', value.trim());
}

export default {
  name: 'QuickSearch',
  components: {
    VuePerfectScrollbar,
  },
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
    items: {
      type: Array,
      required: true,
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    name: {
      type: String,
      default: 'name',
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
