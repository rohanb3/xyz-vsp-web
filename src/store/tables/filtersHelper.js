import { ENTITY_TYPES, FILTER_NAMES, SORTING_DIRECTION } from '@/constants';

const { CALLS, DEVICES } = ENTITY_TYPES;

const filters = {
  [CALLS]: {},
  [DEVICES]: {
    [FILTER_NAMES.SEARCH]: '',
    [FILTER_NAMES.STATUS]: null,
    [FILTER_NAMES.FILTER_COMPANY_IDS]: null,
    [FILTER_NAMES.SORT_BY]: '',
    [FILTER_NAMES.ORDER]: SORTING_DIRECTION.ASC,
  },
};

export default itemType => ({ ...filters[itemType] } || {});
