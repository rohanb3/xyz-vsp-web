<template>
  <quick-search
    entity-name="branchName"
    :items="branches"
    :label="$t('branch')"
    :name="branch => branch.branchName"
    :initial-item="branchId"
    :disabled="!branches.length"
    required
    :not-found-message="$t('branch.not.found')"
    :rules="branchRules"
    @select="branchId => this.$emit('input', {...this.value, branchId})"
  />
</template>


<script>
import QuickSearch from '@/components/QuickSearch/index';

import { ENTITY_TYPES } from '@/constants';

import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'BranchQuickSearch',
  components: {
    QuickSearch,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    company() {
      return (
        this.$store.getters.getItemById(
          this.value.companyId,
          ENTITY_TYPES.COMPANY_LIST,
          item => item.id
        ) || {}
      );
    },
    branches() {
      return this.company.branches || [];
    },
    branchId: {
      get() {
        return this.value.branchId;
      },
      set(branchId) {
        this.$emit('input', { ...this.value, branchId });
      },
    },
  },
  watch: {
    'value.companyId': function name(companyId) {
      if (!companyId) {
        this.branchId = null;
      }
    },
  },
  data() {
    return {
      loading: false,
      entityName: ENTITY_TYPES.COMPANY_LIST,
      branchRules: [validateFieldCantBeEmpty()],
    };
  },
};
</script>
