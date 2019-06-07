<template>
  <quick-search
    entity-name="branchName"
    :items="branches"
    name="branchName"
    @select="selectBranch"
    :disabled="disabled"
  />
</template>


<script>
import QuickSearch from '@/components/QuickSearch';

import { ENTITY_TYPES, FILTER_NAMES_COMPANY_LIST } from '@/constants';

export default {
  name: 'BranchQuickSearch',
  components: {
    QuickSearch,
  },
  props: {
    companyId: {
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    company() {
      return (
        this.$store.getters.getItemById(
          this.companyId,
          ENTITY_TYPES.COMPANY_LIST,
          item => item.id
        ) || {}
      );
    },
    branches() {
      return this.company.branches || [];
    },
  },
  methods: {
    selectBranch(item) {
      this.$emit('selectBranch', item);
    },
  },
};
</script>
