<template>
  <div class="filter-wrapper">
    <table-filter
      name="branchName"
      boundaries-selector=".device-management-table"
      :title="$t('branch')"
      :items="branchList"
      @select="toggleItem"
      @selectAll="onSelectAllItemDisplayed"
      @clearAll="onClearAllItemDisplayed"
      @notFound="onNotFoundBranch"
    >
      <table-loader v-if="loading" slot="loader" />
    </table-filter>
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import TableLoader from '@/components/TableLoader';
import { getBranchList, getBranch } from '@/services/getRepository';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'BranchFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
    sendFieldName: {
      type: String,
      default: 'id',
    },
  },
  components: {
    TableFilter,
    TableLoader,
  },
  mixins: [tableFilterAutocomplete],
  data() {
    return {
      filterName: FILTER_NAMES.FILTER_BRANCH_IDS,
      [FILTER_NAMES.FILTER_BRANCH_IDS]: [],
    };
  },
  mounted() {
    this.loadBranchList();
  },
  computed: {
    branchList() {
      return this[this.filterName];
    },
  },
  methods: {
    loadBranchList() {
      this.loading = true;
      getBranchList()
        .then(({ data }) => {
          this[this.filterName] = data;
          return this.loadingPreselectedItems({
            displayedFieldName: 'branchName',
            getItemById: getBranch,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onNotFoundBranch({ itemKey, searchField }) {
      this.onNotFoundItem({
        itemKey,
        searchField,
        getItemList: getBranchList,
      });
    },
  },
};
</script>
