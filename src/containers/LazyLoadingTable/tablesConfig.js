import {
  LOAD_SUPERADMIN_OPERATORS,
  LOAD_ALL_SUPERADMIN_OPERATORS_LENGTH,
} from '@/store/storage/actionTypes';

import { getSuperadminOperatorsTableColumns } from '@/store/tables/columnsList';

// eslint-disable-next-line import/prefer-default-export
export const SUPERADMIN_OPERATORS_TABLE = {
  loadItemsAction: LOAD_SUPERADMIN_OPERATORS,
  loadItemsLengthAction: LOAD_ALL_SUPERADMIN_OPERATORS_LENGTH,
  getColumns: getSuperadminOperatorsTableColumns,
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
};
