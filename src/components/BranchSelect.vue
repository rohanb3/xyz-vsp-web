<template>
  <div class="form-select">
    <label>{{ $t('branch') }}</label>
    <quick-search
      entity-name="branchName"
      :items="branches"
      :name="getBranchName"
      :initial-item="value.id"
      :disabled="disabled"
      required
      :not-found-message="$t('branch.not.found')"
      :rules="branchRules"
      @select="selectBranch"
    />
  </div>
</template>

<script>
import QuickSearch from './QuickSearch/index';

import { ENTITY_TYPES } from '@/constants';
import { getBranches } from '../services/publicApiRepository';

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
    branchId: {
      get() {
        return this.value.branchId;
      },
      set(branchId) {
        this.$emit('input', { ...this.value, branchId });
      },
    },
    disabled() {
      return !this.branches.length;
    },
  },
  watch: {
    'value.companyId': function name(companyId) {
      if (!companyId) {
        this.branchId = null;
      }
    },
    companyId() {
      this.getBranches();
    },
  },
  mounted() {
    this.getBranches();
  },
  data() {
    return {
      loading: false,
      entityName: ENTITY_TYPES.COMPANY_LIST,
      branchRules: [validateFieldCantBeEmpty()],
      branches: [],
    };
  },
  methods: {
    getBranchName(branch) {
      return branch.branchName;
    },
    selectBranch(id) {
      this.$emit('input', { ...this.value, id });
    },
    getBranches() {
      getBranches(this.companyId).then(response => {
        this.branches = [...response.data];
      });
    },
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
