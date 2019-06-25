<template>
  <div class="filter-wrapper">
    <table-filter
      name="companyName"
      boundaries-selector=".device-management-table"
      :title="$t('company')"
      :items="companyList"
      @select="toggleItem"
      @selectAll="onSelectAllItemDisplayed"
      @clearAll="onClearAllItemDisplayed"
      @notFound="onNotFoundCompany"
    >
      <table-loader v-if="loading" slot="loader" />
    </table-filter>
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import TableLoader from '@/components/TableLoader';
import { getCompanyList, getCompany } from '@/services/getRepository';
import { FILTER_COMPANY_IDS } from '@/constants';

export default {
  name: 'CompanyFilter',
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
      filterName: FILTER_COMPANY_IDS,
      [FILTER_COMPANY_IDS]: [],
    };
  },
  mounted() {
    this.loadCompanyList();
  },
  computed: {
    companyList() {
      return this[this.filterName];
    },
  },
  methods: {
    loadCompanyList() {
      this.loading = true;
      getCompanyList()
        .then(data => {
          this[this.filterName] = data.result;
          return this.loadingPreselectedItems({
            displayedFieldName: 'companyName',
            getItemById: getCompany,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onNotFoundCompany({ itemKey, searchField }) {
      this.onNotFoundItem({
        itemKey,
        searchField,
        getItemList: getCompanyList,
      });
    },
  },
};
</script>
