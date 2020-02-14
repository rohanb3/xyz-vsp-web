<template>
  <div class="form-select">
    <label>{{ $t('company') }}</label>
    <quick-search
      :items="companies"
      :entity-name="entityName"
      :name="getCompanyName"
      :loading-items="loading"
      :initial-item="companyId"
      required
      :rules="companyRules"
      :not-found-message="$t('retailer.not.found')"
      @load="loadItems"
      @loadMoreItems="loadMoreItems"
      @select="selectCompany"
    />
  </div>
</template>

<script>
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';

import { ENTITY_TYPES, FILTER_NAMES_COMPANY_LIST } from '@/constants';

import { validateFieldCantBeEmpty } from '@/services/validators';
import QuickSearch from './QuickSearch/index';

export default {
  name: 'CompanySelect',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  components: { QuickSearch },
  mounted() {
    this.loadItems();
  },
  computed: {
    storageData() {
      return this.$store.state.storage[this.entityName] || {};
    },
    companies() {
      if (this.value.id) {
        this.$store.commit('INSERT_ITEMS', {
          itemType: this.entityName,
          items: [this.value],
        });
      }
      return this.storageData.items || [];
    },
    total() {
      return this.companies.length;
    },
    companyId() {
      return this.value.id;
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
    getCompanyName(company) {
      return company.companyName;
    },
    selectCompany(id) {
      const company = this.companies.find(item => item.id === id) || {};
      this.$emit('input', company);
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

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.form-select {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  /*padding: 0 10px;*/

  label {
    color: $base-text-color;
    font-size: 10px;
    margin-bottom: 5px;
    opacity: 0.7;
  }
}
</style>
