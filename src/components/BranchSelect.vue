<template>
  <div class="form-select">
    <label>{{ $t('branch') }}</label>
    <quick-search
      entity-name="branchName"
      :items="branches"
      :name="branch => branch.branchName"
      :initial-item="value.id"
      :disabled="!branches.length"
      required
      :not-found-message="$t('branch.not.found')"
      :rules="branchRules"
      @select="id => this.$emit('input', {...this.value, id})"
    />
  </div>
</template>

<script>
import QuickSearch from './QuickSearch/index';

import { ENTITY_TYPES } from '@/constants';

import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'BranchSelect',
  components: { QuickSearch },
  props: {
    value: {
      type: Object,
      required: true,
    },
    companyId: {
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
