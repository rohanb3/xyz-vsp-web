<template>
  <div class="ph-container">
    <div class="description-container">
      <div class="text">{{$t('next.payment.will.charged')}} {{date}} {{$t('at')}} {{time}}.</div>
      <div class="text">
        <span>{{$t('please.ensure.that.invoice')}} $ {{nextPayment.amount}} {{$t('or.you.can')}}&nbsp;</span>
        <a @click="onChangePlan">{{$t('change.plan')}}.</a>
      </div>
    </div>
    <div class="payment-method-container">
      <span class="payment-method-text">{{$t('payment.method')}}</span>
      <v-select
        @change="onChangePaymentMethod"
        append-icon="expand_more"
        height="35"
        class="payment-select"
        :items="paymentMethods"
        v-model="selectedMethod"
        solo
        :menu-props="{class: 'payment-select'}"
      >
        <template slot="item" slot-scope="{ item }">
          <img :src="cardIcons[item.type]" class="card-icon">
          <span class="selection-item">{{item.type}} **** {{item.number}}</span>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <img :src="cardIcons[item.type]" class="card-icon">
          <span class="selection-item selected">{{item.type}} **** {{item.number}}</span>
        </template>
        <div class="add-payment-container" slot="append-item">
          <a
            class="add-payment-method-link"
            @click="onAddPaymentMethod"
          >+ {{$t('add.new.payment.method')}}</a>
        </div>
      </v-select>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import {
  SHORT_DAY_SHORT_MONTH_FULL_YEAR_REVERSE,
  DEFAULT_TIME_FORMAT,
} from '@/constants/dateFormats';

const mastercardIcon = require('@/assets/icons/mastercard.png');
const visaIcon = require('@/assets/icons/visa.png');

// mock data
const paymentMethods = [
  {
    type: 'Mastercard',
    number: '0325',
  },
];

export default {
  name: 'PaymentsHeader',
  data() {
    return {
      cardIcons: {
        Visa: visaIcon,
        Mastercard: mastercardIcon,
      },
      selectedMethod: paymentMethods[0],
      paymentMethods,
    };
  },
  methods: {
    onChangePlan() {},
    onChangePaymentMethod() {},
    onAddPaymentMethod() {},
  },
  computed: {
    date() {
      return moment(this.nextPayment.date).format(SHORT_DAY_SHORT_MONTH_FULL_YEAR_REVERSE);
    },
    time() {
      return moment(this.nextPayment.date).format(DEFAULT_TIME_FORMAT);
    },
    nextPayment() {
      const payment = this.$store.state.storage.payments.find(
        item => item.type === 'next_monthly_payment'
      );
      return payment || {};
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.ph-container {
  display: flex;
  height: 65px;
  align-items: center;
  background-color: #f5f9ff;
}
.description-container {
  flex: 1;
  margin-left: 30px;
}
.payment-method-container {
  justify-content: flex-end;
  align-items: center;
  display: flex;
  margin-right: 18px;
}
.text {
  font-size: 12px;
  color: $base-text-color;
}
.payment-method-text {
  font-size: 14px;
  font-weight: 500;
  color: $base-text-color;
  width: 70px;
}
.payment-select {
  width: 340px;
}
.selection-item {
  font-size: 16px;
  color: $base-text-color;
  &.selected {
    font-weight: 500;
  }
}
.card-icon {
  width: 29px;
  margin-right: 11px;
  margin-top: -1px;
}
.add-payment-container {
  display: flex;
  justify-content: center;
  padding: 13px 0;
}
.add-payment-method-link {
  font-size: 16px;
  color: $base-blue;
}
</style>

<style lang="scss">
@import '@/assets/styles/mixins.scss';
.v-select-list[data-v-bbaf8264] {
  .v-list {
    padding: 0;
  }
  .v-list__tile--link {
    height: 42px;
    border-bottom: 1px solid #e1eefe;
  }
}

.payment-select {
  @include select;
}
</style>
