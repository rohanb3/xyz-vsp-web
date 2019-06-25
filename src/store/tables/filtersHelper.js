import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';

const { CALLS, DEVICES } = ENTITY_TYPES;

const filters = {
  [CALLS]: {},
  [DEVICES]: {
    [FILTER_NAMES.SEARCH]: '',
  },
};

export default itemType => ({ ...filters[itemType] } || {});
