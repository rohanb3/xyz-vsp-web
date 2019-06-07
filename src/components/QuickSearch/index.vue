<template>
  <div class="quick-search">
    <v-autocomplete
      :menu-props="{contentClass:`quick-search-select-list select-list-${this.entityNameLowerCase}`}"
      :value="initialItem"
      :items="items"
      :disabled="disabled"
      persistent-hint
      :item-value="itemKey"
      :item-text="name"
      :loading="loadingItems"
      :no-data-text="notFoundMessage"
      clearable
      :entity-name="entityNameLowerCase"
      @input="selectItem"
      @searchInput="debounceInput"
      @loadMoreItems="searchPhrase => $emit('loadMoreItems', searchPhrase)"
    ></v-autocomplete>
  </div>
</template>

<script>
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import debounce from 'lodash.debounce';
import VAutocomplete from './VAutocomplete';

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
    itemKey: {
      type: String,
      default: 'id',
    },
    name: {
      type: String,
      default: 'name',
    },
    loadingItems: {
      type: Boolean,
      default: false,
    },
    notFoundMessage: {
      type: String,
      default: 'table.no.results.found',
    },
    initialItem: {
      type: Number,
      default: null,
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
      this.$emit('select', item);
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
