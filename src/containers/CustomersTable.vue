<template>
  <div class="customers-table">
      <div class="customers-table-toolbar">
        <div class="customers-amount">
          {{ totalCustomersAmount }} {{ $t('companies') }}
        </div>
        <v-spacer></v-spacer>
      </div>
    <wombat-table
      v-if="rows && rows.length"
      :items="rows"
      :columns="columns"
      :item-height="50"
      :resize="false"
      :infinite-loading="!allCustomersLoaded"
      :scroll-on-items-update="true"
      @bottomReached="checkAndInsertCustomers"
     >
       <div
         v-if="rows && rows.length"
         slot="row"
         slot-scope="row"
       >
         <wombat-row
           :item="row.item"
           :columns="row.columns"
           :height="row.item.height"
         >
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
       <div
         slot="footer"
         class="customers-table-footer wombat-footer"
       >
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
import LastPaymentCell from '@/components/tableCells/LastPaymentCell';
import AdditionalCell from '@/components/tableCells/AdditionalCell';
import TableLoader from '@/components/TableLoader';

import { LOAD_CUSTOMERS, LOAD_ALL_CUSTOMERS_LENGTH } from '@/store/storage/actionTypes';

import { getCustomersTableColumns } from '@/services/tableColumns';

export default {
  name: 'CustomersTable',
  components: {
    WombatTable,
    WombatRow,
    DefaultCell,
    EmailCell,
    AdditionalCell,
    LastPaymentCell,
    TableLoader,
  },
  data() {
    return {
      loading: false,
      columns: getCustomersTableColumns(),
      rowComponentsHash: {
        default: 'DefaultCell',
        email: 'EmailCell',
        lastPayment: 'LastPaymentCell',
        additional: 'AdditionalCell',
      },
    };
  },
  mounted() {
    this.getAllCustomersLength().then(this.insertCustomers);
  },
  computed: {
    rows() {
      return this.$store.state.storage.customers.map(item => ({
        ...item,
        height: '50px',
      }));
    },
    totalCustomersAmount() {
      return this.$store.state.storage.allCustomersLength;
    },
    allCustomersLoaded() {
      return this.$store.getters.allCustomersLoaded;
    },
  },
  methods: {
    async checkAndInsertCustomers() {
      if (!this.allCustomersLoaded) {
        await this.insertCustomers();
      }
    },
    insertCustomers() {
      this.loading = true;
      return this.$store.dispatch(LOAD_CUSTOMERS).then(() => {
        this.loading = false;
      });
    },
    getAllCustomersLength() {
      return this.$store.dispatch(LOAD_ALL_CUSTOMERS_LENGTH);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.customers-table {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 $table-shadow-color;
}

.customers-table-toolbar {
  display: flex;
  flex-flow: row;
  height: $customers-table-header-height;
  align-items: center;
  padding: 0px 29px;
}

.customers-amount {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: $table-row-text-color;
}

.customers-table-footer {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
</style>
