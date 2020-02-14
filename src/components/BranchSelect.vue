<template>
  <div class="form-select">
    <label>{{ $t('branch') }}</label>
    <quick-search
      entity-name="branchName"
      :items="branches"
      :name="getBranchName"
      :initial-item="branch.id"
      :disabled="disabled"
      required
      :not-found-message="$t('branch.not.found')"
      :rules="branchRules"
      @select="selectBranch"
    />
  </div>
</template>

<script>
import { ENTITY_TYPES } from '@/constants';
import { validateFieldCantBeEmpty } from '@/services/validators';
import QuickSearch from './QuickSearch/index';

import { getBranches } from '../services/publicApiRepository';

export default {
  name: 'BranchSelect',
  components: { QuickSearch },
  props: {
    value: {
      type: Object,
      required: true,
    },
    company: {
      required: true,
    },
  },
  computed: {
    branch: {
      get() {
        return this.value;
      },
      set(id) {
        const branch = this.branches.find(item => item.id === id);
        this.$emit('input', branch);
      },
    },
    disabled() {
      return !this.branches.length || !this.companyId;
    },
    companyId() {
      return this.company.id;
    },
  },
  watch: {
    companyId(val) {
      if (val) {
        this.getBranches();
      }
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
      this.branch = id;
    },
    getBranches() {
      this.branches = [];
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
