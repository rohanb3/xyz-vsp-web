<template>
  <div class="customers-table">
      <div class="customers-table-toolbar">
        <div class="customers-amount">
          {{ totalCustomersAmount }} {{ $t('Companies') }}
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
import DefaultCell from '@/components/DefaultCell';
import EmailCell from '@/components/EmailCell';
import LastPaymentCell from '@/components/LastPaymentCell';
import AdditionalCell from '@/components/AdditionalCell';
import TableLoader from '@/components/TableLoader';

import {
  LOAD_CUSTOMERS,
  LOAD_ALL_CUSTOMERS_LENGTH,
} from '@/store/storage/actionTypes';

export default {
  name: 'CustomersList',
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
      rowComponentsHash: {
        default: 'DefaultCell',
        email: 'EmailCell',
        lastPayment: 'LastPaymentCell',
        additional: 'AdditionalCell',
      },
      columns: [
        {
          name: 'company',
          field: 'company',
          title: this.$t('Company'),
          width: '300px',
        },
        {
          name: 'contactPerson',
          field: 'contactPerson',
          class: 'text',
          title: this.$t('Contact person'),
        },
        {
          name: 'email',
          field: 'email',
          fieldType: 'email',
          class: 'text',
          title: this.$t('Email'),
        },
        {
          name: 'phone',
          field: 'phone',
          class: 'text',
          title: this.$t('Phone'),
          width: '150px',
        },
        {
          name: 'lastPayment',
          field: 'lastPayment',
          fieldType: 'lastPayment',
          title: this.$t('Last payment'),
        },
        {
          name: 'amount',
          field: 'amount',
          title: this.$t('Amount'),
          class: 'number',
          width: '100px',
        },
        {
          name: 'additional',
          field: null,
          fieldType: 'additional',
          title: '',
          width: '100px',
        },
      ],
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
    async checkAndInsertCustomers(state) {
      if (!this.allCustomersLoaded) {
        await this.insertCustomers();
        state.loaded();
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

.header-button {
  padding-left: 1px;
  padding-right: 10px;
  color: $table-icon-color;
  background-color: #fff;

  span {
    margin-left: 5px;
  }
}

.customers-table-footer {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
</style>
