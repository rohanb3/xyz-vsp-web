<template>
  <quick-search
    :items="companies"
    :entity-name="entityName"
    :name="company => company.companyName"
    :loading-items="loading"
    :initial-item="companyId"
    :label="$t('company')"
    required
    :rules="companyRules"
    :not-found-message="$t('retailer.not.found')"
    @load="loadItems"
    @loadMoreItems="loadMoreItems"
    @select="companyId => this.$emit('input', {...this.value, companyId})"
  />
</template>

<script>
import QuickSearch from '@/components/QuickSearch/index';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';

import { ENTITY_TYPES, FILTER_NAMES_COMPANY_LIST } from '@/constants';

import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'CompanyQuickSearch',
  components: {
    QuickSearch,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.loadItems();
  },
  computed: {
    storageData() {
      return this.$store.state.storage[this.entityName] || {};
    },
    companies() {
      return this.storageData.items || [];
    },
    total() {
      return this.companies.length;
    },
    companyId() {
      return this.value.companyId;
    },
  },
  methods: {
    loadItems(searchPhrase = '') {
      this.loading = true;
      const data = {
        itemType: this.entityName,
        filters: {
          [FILTER_NAMES_COMPANY_LIST.SEARCH_FILTER]: searchPhrase,
        },
      };
      return this.$store.dispatch(LOAD_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
    loadMoreItems(searchPhrase = '') {
      this.loading = true;
      const data = {
        itemType: this.entityName,
        filters: {
          [FILTER_NAMES_COMPANY_LIST.SEARCH_FILTER]: searchPhrase,
          [FILTER_NAMES_COMPANY_LIST.SKIP]: this.total,
        },
      };
      return this.$store.dispatch(LOAD_MORE_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
  },
  data() {
    return {
      loading: false,
      entityName: ENTITY_TYPES.COMPANY_LIST,
      companyRules: [validateFieldCantBeEmpty()],
    };
  },
};
</script>
