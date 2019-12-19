<template>
  <div class="quick-search">
    <v-autocomplete
      :menu-props="{contentClass:`quick-search-select-list select-list-${this.entityNameLowerCase}`}"
      :value="initialItem"
      :label="$t(label)"
      :items="items"
      :disabled="disabled"
      persistent-hint
      :item-value="itemKeyExtractor"
      :item-text="name"
      :loading="loadingItems"
      :no-data-text="notFoundMessage"
      clearable
      :required="required"
      :rules="rules"
      :entity-name="entityNameLowerCase"
      @input="selectItem"
      @searchInput="debounceInput"
      @loadMoreItems="searchPhrase => $emit('loadMoreItems', searchPhrase)"
    ></v-autocomplete>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import VAutocomplete from './VAutocomplete';
import i18n from '@/i18n';

const SEARCH_TIMEOUT = 500;

function debounceInput(value) {
  this.$emit('load', (value || '').trim());
}

export default {
  name: 'QuickSearch',
  components: {
    VAutocomplete,
  },
  mixins: [tableToolbarBalloon],
  props: {
    label: {
      type: String,
      default: '',
    },
    entityName: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    itemKeyExtractor: {
      type: Function,
      default: item => item.id,
    },
    name: {
      type: Function,
      default: item => item.name,
    },
    loadingItems: {
      type: Boolean,
      default: false,
    },
    notFoundMessage: {
      type: String,
      default: i18n.t('table.no.results.found'),
    },
    initialItem: {
      default: null,
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    entityNameLowerCase() {
      return this.entityName.toLowerCase();
    },
  },
  methods: {
    debounceInput: debounce(debounceInput, SEARCH_TIMEOUT),
    selectItem(item) {
      if (item) {
        this.$emit('select', item);
      } else {
        this.$emit('select', null);
      }
    },
  },
};
</script>

<style lang="scss">
.quick-search-select-list {
  .v-select-list {
    position: relative;
    max-height: 25vh;

    .v-list__tile__title {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 240px;
    }
  }
}
</style>
