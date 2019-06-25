import { ENTITY_TYPES, FILTER_NAMES, FILTER_COMPANY_IDS } from '@/constants';

const { CALLS, DEVICES } = ENTITY_TYPES;

const filters = {
  [CALLS]: {},
  [DEVICES]: {
    [FILTER_NAMES.SEARCH]: '',
    [FILTER_NAMES.STATUS]: null,
    [FILTER_COMPANY_IDS]: null,
  },
};

export default itemType => ({ ...filters[itemType] } || {});
