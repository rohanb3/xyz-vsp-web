<template>
  <div class="companies-table">
    <div class="companies-table-toolbar">
      <div class="companies-amount">{{ totalCompaniesAmount }} {{ $t('companies') }}</div>
      <v-spacer></v-spacer>
    </div>
    <wombat-table
      v-if="rows && rows.length"
      :items="rows"
      :columns="columns"
      :item-height="50"
      :infinite-loading="!allCompaniesLoaded"
      @bottomReached="checkAndInsertCompanies"
      @columnsResized="onColumnsResized"
      @columnsReordered="onColumnsReordered"
    >
      <div v-if="rows && rows.length" slot="row" slot-scope="row">
        <wombat-row :item="row.item" :columns="row.columns" :height="row.item.height">
          <component
            slot="row-cell"
            slot-scope="rowCell"
            class="row-cell"
            :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
            :item="rowCell.item"
            :column="rowCell.column"
          />
        </wombat-row>
      </div>
      <div slot="footer" class="companies-table-footer wombat-footer">
        <table-loader v-if="loading"/>
      </div>
    </wombat-table>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import DefaultCell from '@/components/tableCells/DefaultCell';
import EmailCell from '@/components/tableCells/EmailCell';
import CreatedCell from '@/components/tableCells/CreatedCell';
import AdditionalCell from '@/components/tableCells/AdditionalCell';
import TableLoader from '@/components/TableLoader';

import smartTable from '@/mixins/smartTable';

import { ENTITY_TYPES } from '@/constants';

const { LOAD_SUPERADMIN_COMPANIES, LOAD_SUPERADMIN_COMPANIES_LENGTH } = {};

export default {
  name: 'SuperadminCompaniesTable',
  components: {
    WombatTable,
    WombatRow,
    DefaultCell,
    EmailCell,
    AdditionalCell,
    CreatedCell,
    TableLoader,
  },
  mixins: [smartTable],
  data() {
    return {
      tableName: ENTITY_TYPES.COMPANIES,
      loading: false,
      rowComponentsHash: {
        default: 'DefaultCell',
        email: 'EmailCell',
        created: 'CreatedCell',
        additional: 'AdditionalCell',
      },
    };
  },
  mounted() {
    this.getAllCompaniesLength().then(this.insertCompanies);
  },
  computed: {
    rows() {
      return this.$store.state.storage.superadminCompanies.map(item => ({
        ...item,
        height: '50px',
      }));
    },
    totalCompaniesAmount() {
      return this.$store.state.storage.allSuperadminCompaniesLength;
    },
    allCompaniesLoaded() {
      return this.$store.getters.allSuperadminCompaniesLoaded;
    },
  },
  methods: {
    checkAndInsertCompanies() {
      if (!this.allCompaniesLoaded) {
        this.insertCompanies();
      }
    },
    insertCompanies() {
      this.loading = true;
      return this.$store.dispatch(LOAD_SUPERADMIN_COMPANIES).then(() => {
        this.loading = false;
      });
    },
    getAllCompaniesLength() {
      return this.$store.dispatch(LOAD_SUPERADMIN_COMPANIES_LENGTH);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.companies-table {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 $table-shadow-color;
}

.companies-table-toolbar {
  display: flex;
  flex-flow: row;
  height: $superadmin-companies-table-toolbar-height;
  align-items: center;
  padding: 0px 29px;
}

.companies-amount {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: $table-row-text-color;
}

.companies-table-footer {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
</style>
