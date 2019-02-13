import Vue from 'vue';

import {
  LOAD_SUPERADMIN_OPERATORS,
  LOAD_ALL_SUPERADMIN_OPERATORS_LENGTH,
  LOAD_PAYMENTS,
  LOAD_ALL_PAYMENTS_LENGTH,
} from '@/store/storage/actionTypes';

import { SUPERADMIN_OPERATORS_TABLE, PAYMENTS_TABLE } from '@/constants/tablesNames';

import {
  getSuperadminOperatorsTableColumns,
  getPaymentsTableColumns,
} from '@/services/tablesColumnsList';

import AdditionalCell from '@/components/tableCells/AdditionalCell';
import CallDurationCell from '@/components/tableCells/CallDurationCell';
import CallEfficiencyCell from '@/components/tableCells/CallEfficiencyCell';
import CallsAmountCell from '@/components/tableCells/CallsAmountCell';
import CallTypeCell from '@/components/tableCells/CallTypeCell';
import ClientFeedbackCell from '@/components/tableCells/ClientFeedbackCell';
import DateCell from '@/components/tableCells/DateCell';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DurationCell from '@/components/tableCells/DurationCell';
import EmailCell from '@/components/tableCells/EmailCell';
import FeedbackQualityCell from '@/components/tableCells/FeedbackQualityCell';
import IdCell from '@/components/tableCells/IdCell';
import LastPaymentCell from '@/components/tableCells/LastPaymentCell';
import LastReviewCell from '@/components/tableCells/LastReviewCell';
import LinkCell from '@/components/tableCells/LinkCell';
import OperatorFeedbackCell from '@/components/tableCells/OperatorFeedbackCell';
import OperatorNameCell from '@/components/tableCells/OperatorNameCell';
import QtyOfReviewsCell from '@/components/tableCells/QtyOfReviewsCell';
import RatingCell from '@/components/tableCells/RatingCell';
import ScoreCell from '@/components/tableCells/ScoreCell';
import ServiceEficiencyCell from '@/components/tableCells/ServiceEficiencyCell';
import StatusCell from '@/components/tableCells/StatusCell';
import WaitTimeCell from '@/components/tableCells/WaitTimeCell';
import WrapUpTimeCell from '@/components/tableCells/WrapUpTimeCell';

Vue.component('AdditionalCell', AdditionalCell);
Vue.component('CallDurationCell', CallDurationCell);
Vue.component('CallEfficiencyCell', CallEfficiencyCell);
Vue.component('CallsAmountCell', CallsAmountCell);
Vue.component('CallTypeCell', CallTypeCell);
Vue.component('ClientFeedbackCell', ClientFeedbackCell);
Vue.component('DateCell', DateCell);
Vue.component('DefaultCell', DefaultCell);
Vue.component('DurationCell', DurationCell);
Vue.component('EmailCell', EmailCell);
Vue.component('FeedbackQualityCell', FeedbackQualityCell);
Vue.component('IdCell', IdCell);
Vue.component('LastPaymentCell', LastPaymentCell);
Vue.component('LastReviewCell', LastReviewCell);
Vue.component('LinkCell', LinkCell);
Vue.component('OperatorFeedbackCell', OperatorFeedbackCell);
Vue.component('OperatorNameCell', OperatorNameCell);
Vue.component('QtyOfReviewsCell', QtyOfReviewsCell);
Vue.component('RatingCell', RatingCell);
Vue.component('ScoreCell', ScoreCell);
Vue.component('ServiceEficiencyCell', ServiceEficiencyCell);
Vue.component('StatusCell', StatusCell);
Vue.component('WaitTimeCell', WaitTimeCell);
Vue.component('WrapUpTimeCell', WrapUpTimeCell);

const tables = {
  [SUPERADMIN_OPERATORS_TABLE]: {
    loadItemsAction: LOAD_SUPERADMIN_OPERATORS,
    loadItemsLengthAction: LOAD_ALL_SUPERADMIN_OPERATORS_LENGTH,
    allTableColumns: getSuperadminOperatorsTableColumns(),
    rowsGetter: 'superadminOperators',
    itemsLengthGetter: 'allSuperadminOperatorsLength',
    allItemsLoadedGetter: 'allSuperadminOperatorsLoaded',
    showDatesEditor: false,
    showColumnsListEditor: false,
    rowComponents: {
      additional: 'AdditionalCell',
      wrapUpTime: 'WrapUpTimeCell',
      default: 'DefaultCell',
      rating: 'RatingCell',
      calls: 'CallsAmountCell',
      name: 'LinkCell',
      id: 'IdCell',
    },
  },
  [PAYMENTS_TABLE]: {
    loadItemsAction: LOAD_PAYMENTS,
    loadItemsLengthAction: LOAD_ALL_PAYMENTS_LENGTH,
    allTableColumns: getPaymentsTableColumns(),
    rowsGetter: 'payments',
    itemsLengthGetter: 'paymentsLength',
    allItemsLoadedGetter: 'allPaymentsLoaded',
    showDatesEditor: false,
    showColumnsListEditor: false,
    rowComponents: {
      default: 'DefaultCell',
      additional: 'AdditionalCell',
    },
  },
};

// eslint-disable-next-line import/prefer-default-export
export const getTableConfig = name => tables[name];
